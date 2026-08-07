#!/usr/bin/env bash

# Ce script permet d'initialiser la création d'un nouveau projet à partir de ce template.
# Il permet de repartir à zéro en supprimant les fichiers et dossiers spécifiques à ce template

set -euo pipefail

## CONSTANTES définies dans le script
## template_name : nom du template
## template_url : URL du dépôt du template
## template_creator_firstname : prénom de l'auteur du template
## template_creator_name : nom de l'auteur du template
TEMPLATE_NAME="js-template"
TEMPLATE_URL="https://forge.apps.education.fr/eyssette/js-template"
TEMPLATE_CREATOR_FIRSTNAME="Cédric"
TEMPLATE_CREATOR_NAME="Eyssette"

## Variables qui seront à renseigner par l'utilisateur lors de l'initialisation du projet
RAW_PROJECT_NAME=""
REPO_URL=""
USER_FIRSTNAME=""
USER_NAME=""

PROJECT_DIR="$(pwd)"
INIT_DIR="${PROJECT_DIR}/.init"
LOG_FILE="${INIT_DIR}/init.log"

# --- Fonctions utilitaires ---

log() {
	mkdir -p "$INIT_DIR"
	echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >>"$LOG_FILE"
}

info() {
	echo -e "\033[1;34mℹ️  $*\033[0m"
	log "INFO: $*"
}

warn() {
	echo -e "\033[1;33m⚠️  $*\033[0m"
	log "WARN: $*"
}

error() {
	echo -e "\033[1;31m❌ $*\033[0m" >&2
	log "ERROR: $*"
}

success() {
	echo -e "\033[1;32m✅ $*\033[0m"
	log "OK: $*"
}

important() {
	echo -e "\033[1;31m $*\033[0m"
	log "IMPORTANT: $*"
}

confirm() {
	# Demande une confirmation à l'utilisateur (o/N)
	local prompt="${1:-Voulez-vous continuer ?}"
	local reponse
	read -r -p "$prompt [o/N] " reponse
	case "$reponse" in
	[oOyY]*) return 0 ;;
	*) return 1 ;;
	esac
}

step() {
	# Affiche une étape, explique l'action, et demande confirmation sauf si le troisième argument est "skip-confirm"
	local titre="$1" explication="$2" skipconfirm="${3:-ask-user}"
	echo ""
	important "------------------------------------------------------------"
	important "▶ $titre"
	echo "$explication"
	important "------------------------------------------------------------"
	echo ""
	if [ "$skipconfirm" == "skip-confirm" ]; then
		return 0
	fi
	if ! confirm "Confirmer cette étape ?"; then
		warn "Étape ignorée par l'utilisateur : $titre"
		log "SKIPPED: $titre"
		return 1
	fi
	return 0
}

detect_os() {
	case "$(uname -s)" in
	Linux*) echo "linux" ;;
	Darwin*) echo "macos" ;;
	MINGW* | MSYS* | CYGWIN*) echo "windows" ;;
	*) echo "unknown" ;;
	esac
}
OS="$(detect_os)"

replace_first_occurrence() {
	# Remplace uniquement la première ligne correspondant à un motif dans un fichier
	# (utile pour package-lock.json, qui contient "version"/"name" en de multiples endroits)
	local file="$1" pattern="$2" replacement="$3"
	local tmp
	tmp="$(mktemp)"
	awk -v pat="$pattern" -v repl="$replacement" '
        !done && $0 ~ pat { print repl; done=1; next }
        { print }
    ' "$file" >"$tmp" && mv "$tmp" "$file"
}

sed_inplace() {
	# Portable entre GNU sed (Linux) et BSD sed (macOS) : on passe toujours un suffixe de sauvegarde
	sed -i.bak "$@"
}

# IMPORTANT :
# - ATTENTION : blocage initial si le dossier de l'application s'appelle "TEMPLATE_NAME" et demande à l'utilisateur d'abord de renommer le dossier avant de continuer
CURRENT_DIR_NAME="$(basename "$PROJECT_DIR")"
if [ "$CURRENT_DIR_NAME" = "$TEMPLATE_NAME" ]; then
	error "Le dossier courant s'appelle encore \"$TEMPLATE_NAME\" (nom du template)."
	error "Merci de renommer le dossier de votre projet avant de relancer ce script."
	exit 1
fi

# - ATTENTION : indiquer dès le début que le script va réinitialiser le projet, et demander à l'utilisateur de confirmer qu'il veut continuer
echo ""
important "============================================================"
important " Initialisation d'un nouveau projet à partir du template"
important " \"$TEMPLATE_NAME\""
important "============================================================"
echo ""
warn "Ce script va SUPPRIMER et modifier des fichiers du template"
echo "C'est un script d'initialisation pour créer un nouveau projet"
warn "Il faut le lancer une seule fois, au tout début du projet"
echo "Ne lancez pas ce script si vous avez déjà commencé à faire des modifications"
echo ""
if ! confirm "Voulez-vous continuer ?"; then
	echo "Abandon à la demande de l'utilisateur."
	exit 0
fi
mkdir -p "$INIT_DIR"
log "Début de l'initialisation du projet dans $PROJECT_DIR"

# - Avertissement à chaque étape (on indique bien ce qu'on va faire et pourquoi) et demande de confirmation pour continuer
# -> voir la fonction step() ci-dessus, utilisée avant chaque action ci-dessous

# SUPPRESSIONS :

# 1. Suppression du dossier .git s'il existe
if step "Suppression du dossier .git" "Le dossier .git contient l'historique du template ; il doit être supprimé pour repartir sur un dépôt vierge."; then
	if [ -d "${PROJECT_DIR}/.git" ]; then
		rm -rf "${PROJECT_DIR}/.git"
		success "Dossier .git supprimé."
	else
		info "Aucun dossier .git trouvé, rien à supprimer."
	fi
fi

# 2. Suppression du CHANGELOG.md
if step "Suppression du CHANGELOG.md" "Le CHANGELOG.md du template ne concerne pas votre projet ; il sera régénéré au fil de vos versions."; then
	if [ -f "${PROJECT_DIR}/CHANGELOG.md" ]; then
		rm -f "${PROJECT_DIR}/CHANGELOG.md"
		success "CHANGELOG.md supprimé."
	else
		info "Aucun CHANGELOG.md trouvé, rien à supprimer."
	fi
fi

# 3. Suppression du README.md
if step "Suppression du README.md" "Le README.md du template va être remplacé par un README.md généré pour votre projet."; then
	if [ -f "${PROJECT_DIR}/README.md" ]; then
		rm -f "${PROJECT_DIR}/README.md"
		success "README.md supprimé."
	else
		info "Aucun README.md trouvé, rien à supprimer."
	fi
fi

# PERSONNALISATION :

if step "Personnalisation du projet" "Le script va maintenant personnaliser le projet en remplaçant les informations du template par celles de votre projet." "skip-confirm"; then
	warn "Attention, il ne faut plus simplement confirmer"
	warn "Renseignez bien les informations demandées !"
	echo ""
	echo "1. Nom du projet"
	read -r -p "Quel est le nom de votre projet ? " RAW_PROJECT_NAME
	echo ""
	echo "2. URL de votre projet sur la Forge"
	info "Format attendu : https://forge.apps.education.fr/<group>/<project>"
	read -r -p "Quelle est l'URL de votre projet ? : " REPO_URL
	# Normalisation : minuscules, espaces -> tirets, suppression des caractères spéciaux
	NORMALIZED_PROJECT_NAME="$(echo "$RAW_PROJECT_NAME" |
		tr '[:upper:]' '[:lower:]' |
		tr ' ' '-' |
		sed -E 's/[^a-z0-9._-]//g')"

	if [ -z "$NORMALIZED_PROJECT_NAME" ]; then
		error "Nom de projet invalide après normalisation."
		exit 1
	fi
	info "Nom du projet normalisé : $NORMALIZED_PROJECT_NAME"
	echo ""
	echo "3. Votre prénom et nom (pour l'auteur du projet)"
	read -r -p "Votre prénom : " USER_FIRSTNAME
	read -r -p "Votre nom : " USER_NAME
fi

# CREATION :
# - création d'un fichier README.md à partir d'un template README.md (README-template.md) avec en arguments : le nom du projet, le prénom et nom de l'utilisateur, l'URL du dépôt principal{{user_first_name}}
if step "Génération du README.md" "Un README.md est généré à partir de README-template.md, avec le nom du projet, l'auteur et l'URL du dépôt."; then
	README_TEMPLATE="${PROJECT_DIR}/scripts/init/README-template.md"
	if [ -f "$README_TEMPLATE" ]; then
		cp "$README_TEMPLATE" "${PROJECT_DIR}/README.md"
		sed_inplace \
			-e "s/{{project_name}}/${RAW_PROJECT_NAME}/g" \
			-e "s/{{template_name}}/${TEMPLATE_NAME}/g" \
			-e "s/{{template_creator_firstname}}/${TEMPLATE_CREATOR_FIRSTNAME}/g" \
			-e "s/{{template_creator_name}}/${TEMPLATE_CREATOR_NAME}/g" \
			-e "s#{{template_url}}#${TEMPLATE_URL}#g" \
			-e "s/{{user_name}}/${USER_NAME}/g" \
			-e "s/{{user_firstname}}/${USER_FIRSTNAME}/g" \
			-e "s#{{repo_url}}#${REPO_URL}#g" \
			"${PROJECT_DIR}/README.md"
		rm -f "${PROJECT_DIR}/README.md.bak"
		success "README.md généré à partir de README-template.md."
	else
		warn "README-template.md introuvable, README.md n'a pas pu être généré."
	fi
fi

# CHANGEMENT :

# - Demande à l'utilisateur du nom du projet et changement du nom "TEMPLATE_NAME" par le nom du projet dans les fichiers : package.json et package-lock.json (champ "name" : sans espaces, sans majuscules, sans caractères spéciaux), Taskfile.yml (seulement dans le champ : APP_NAME ; ne pas modifier les autres occurrences), /scripts/release/create-zipped-dist-from-tag.sh (champ : ZIP_NAME).
if step "Renommage du projet" "Le nom \"$TEMPLATE_NAME\" va être remplacé par le nom réel de votre projet."; then

	if [ -f "${PROJECT_DIR}/package.json" ]; then
		sed_inplace -E "s/(\"name\"[[:space:]]*:[[:space:]]*)\"[^\"]*\"/\1\"${NORMALIZED_PROJECT_NAME}\"/" "${PROJECT_DIR}/package.json"
		rm -f "${PROJECT_DIR}/package.json.bak"
		success "package.json (name) mis à jour."
	fi

	if [ -f "${PROJECT_DIR}/package-lock.json" ]; then
		replace_first_occurrence "${PROJECT_DIR}/package-lock.json" '"name"[[:space:]]*:' "  \"name\": \"${NORMALIZED_PROJECT_NAME}\","
		success "package-lock.json (name racine) mis à jour."
	fi

	if [ -f "${PROJECT_DIR}/Taskfile.yml" ]; then
		sed_inplace -E "s/^([[:space:]]*APP_NAME[[:space:]]*:[[:space:]]*).*/\1\"${RAW_PROJECT_NAME}\"/" "${PROJECT_DIR}/Taskfile.yml"
		rm -f "${PROJECT_DIR}/Taskfile.yml.bak"
		success "Taskfile.yml (APP_NAME) mis à jour."
	fi

	ZIP_SCRIPT="${PROJECT_DIR}/scripts/release/create-zipped-dist-from-tag.sh"
	if [ -f "$ZIP_SCRIPT" ]; then
		sed_inplace -E "s/^([[:space:]]*ZIP_NAME[[:space:]]*=[[:space:]]*).*/\1\"${NORMALIZED_PROJECT_NAME}\"/" "$ZIP_SCRIPT"
		rm -f "${ZIP_SCRIPT}.bak"
		success "create-zipped-dist-from-tag.sh (ZIP_NAME) mis à jour."
	fi
fi

# - changement du numéro de version par 0.0.0 dans les fichiers : VERSION (le fichier ne contient que le numéro de version), package.json (champ : "version"), package-lock.json (champ : "version"), .cz.toml (champ : version)
if step "Réinitialisation du numéro de version à 0.0.0" "Les fichiers VERSION, package.json, package-lock.json et .cz.toml contiennent le numéro de version du template ; il doit repartir à 0.0.0."; then
	NEW_VERSION="0.0.0"

	if [ -f "${PROJECT_DIR}/VERSION" ]; then
		echo "$NEW_VERSION" >"${PROJECT_DIR}/VERSION"
		success "VERSION mis à jour."
	fi

	if [ -f "${PROJECT_DIR}/package.json" ]; then
		sed_inplace -E "s/(\"version\"[[:space:]]*:[[:space:]]*)\"[^\"]*\"/\1\"${NEW_VERSION}\"/" "${PROJECT_DIR}/package.json"
		rm -f "${PROJECT_DIR}/package.json.bak"
		success "package.json (version) mis à jour."
	fi

	if [ -f "${PROJECT_DIR}/package-lock.json" ]; then
		replace_first_occurrence "${PROJECT_DIR}/package-lock.json" '"version"[[:space:]]*:' "  \"version\": \"${NEW_VERSION}\","
		success "package-lock.json (version racine) mis à jour."
	fi

	if [ -f "${PROJECT_DIR}/.cz.toml" ]; then
		sed_inplace -E "s/^([[:space:]]*version[[:space:]]*=[[:space:]]*)\"[^\"]*\"/\1\"${NEW_VERSION}\"/" "${PROJECT_DIR}/.cz.toml"
		rm -f "${PROJECT_DIR}/.cz.toml.bak"
		success ".cz.toml (version) mis à jour."
	fi
fi

# - Demande à l'utilisateur de l'URL du dépôt principal (on indique à l'utilisateur la forme que doit avoir l'URL du template : https://forge.apps.education.fr/<group>/<project> ) et on remplace "TEMPLATE_URL" par l'URL du dépôt principal dans les fichiers :.cz.toml (champ : extras.commit_url), Taskfile.yml (champ : MAIN_REPO_URL)
if step "Configuration de l'URL du dépôt principal" "L'URL du dépôt principal de votre application doit remplacer l'URL du template"; then

	if [ -f "${PROJECT_DIR}/.cz.toml" ]; then
		sed_inplace -E "s#^([[:space:]]*commit_url[[:space:]]*=[[:space:]]*\"[^\"]*)${TEMPLATE_URL}([^\"]*\".*)#\1${REPO_URL}\2#" "${PROJECT_DIR}/.cz.toml"
		rm -f "${PROJECT_DIR}/.cz.toml.bak"
		success ".cz.toml (extras.commit_url) mis à jour."
	fi

	if [ -f "${PROJECT_DIR}/Taskfile.yml" ]; then
		sed_inplace -E "s#^([[:space:]]*MAIN_REPO_URL[[:space:]]*:[[:space:]]*).*#\1${REPO_URL}#" "${PROJECT_DIR}/Taskfile.yml"
		rm -f "${PROJECT_DIR}/Taskfile.yml.bak"
		success "Taskfile.yml (MAIN_REPO_URL) mis à jour."
	fi
fi

if [ -f "${PROJECT_DIR}/Taskfile.yml" ]; then
	if confirm "Souhaitez-vous utiliser un autre dépôt (remote) en plus du dépôt principal ?"; then
		read -r -p "Nom de ce dépôt (remote) : " EXTRA_REMOTE
		sed_inplace "s/forge, github/origin, ${EXTRA_REMOTE}/g" "${PROJECT_DIR}/Taskfile.yml"
	else
		sed_inplace "s/forge, github/origin/g" "${PROJECT_DIR}/Taskfile.yml"
	fi
	rm -f "${PROJECT_DIR}/Taskfile.yml.bak"
	success "Taskfile.yml (remotes) mis à jour."
fi

# - Demande à l'utilisateur son prénom, puis son nom. On remplace le nom "USER_NAME" par le nom de l'utilisateur dans les fichiers : LICENSE, et prénom nom "USER_FIRSTNAME USER_NAME" par le prénom et nom de l'utilisateur dans les fichiers : package.json (champ : author).
if step "Renseignement de l'auteur du projet" "Remplacement du prénom et nom de l'auteur du template par votre prénom et votre nom"; then

	if [ -f "${PROJECT_DIR}/LICENSE" ]; then
		sed_inplace "s/${TEMPLATE_CREATOR_NAME}/${USER_NAME}/g" "${PROJECT_DIR}/LICENSE"
		rm -f "${PROJECT_DIR}/LICENSE.bak"
		success "LICENSE (auteur) mis à jour."
	fi

	if [ -f "${PROJECT_DIR}/package.json" ]; then
		sed_inplace "s/${TEMPLATE_CREATOR_FIRSTNAME} ${TEMPLATE_CREATOR_NAME}/${USER_FIRSTNAME} ${USER_NAME}/g" "${PROJECT_DIR}/package.json"
		rm -f "${PROJECT_DIR}/package.json.bak"
		success "package.json (author) mis à jour."
	fi
fi

# GIT :
# - Vérification que git est installée : sinon proposer l'installation de git et bloquer le script tant que git n'est pas installé
if ! command -v git >/dev/null 2>&1; then
	warn "git n'est pas installé sur votre machine."
	case "$OS" in
	linux)
		info "Procédure d'installation : https://git-scm.com/install/linux"
		;;
	macos)
		info "Procédure d'installation : https://git-scm.com/install/mac"
		;;
	windows)
		info "Procédure d'installation : https://git-scm.com/install/windows"
		;;
	*)
		info "Consultez https://git-scm.com/install/ pour installer git."
		;;
	esac
	error "Le script ne peut pas continuer sans git. Installez git puis relancez le script."
	exit 1
fi
success "git est installé ($(git --version))."

# - initialisation d'un nouveau dépôt git avec une branche principale nommée "main"
if step "Initialisation du dépôt git" "Un nouveau dépôt git est créé avec pour branche principale \"main\"."; then
	git -C "$PROJECT_DIR" init -b main
	success "Dépôt git initialisé (branche main)."

	# - création d'un commit initial avec le message "feat(init): initialisation du projet à partir du template {{template_name}}"
	if step "Création du commit initial" "Le premier commit permet d'initialiser le projet à partir du template." "skip-confirm"; then
		if [ -z "$(git -C "$PROJECT_DIR" config --get user.name || true)" ]; then
			read -r -p "Nom git à utiliser pour ce dépôt (user.name) : " GIT_USER_NAME
			git -C "$PROJECT_DIR" config user.name "$GIT_USER_NAME"
		fi
		if [ -z "$(git -C "$PROJECT_DIR" config --get user.email || true)" ]; then
			read -r -p "Email git à utiliser pour ce dépôt (user.email) : " GIT_USER_EMAIL
			git -C "$PROJECT_DIR" config user.email "$GIT_USER_EMAIL"
		fi
		git -C "$PROJECT_DIR" add -A
		git -C "$PROJECT_DIR" commit -m "feat(init): initialisation du projet à partir du template ${TEMPLATE_NAME}"
		success "Commit initial créé."
	fi

	# - création d'un tag initial nommé "0.0.0"
	if step "Création du tag initial" "Le tag 0.0.0 marque le point de départ du versionnement du projet." "skip-confirm"; then
		git -C "$PROJECT_DIR" tag "0.0.0"
		success "Tag 0.0.0 créé."
	fi

	# - configuration d'un remote nommé "origin" pointant vers l'URL du dépôt principal
	if step "Configuration du remote git" "Le remote \"origin\" est configuré pour pointer vers l'URL du dépôt principal." "skip-confirm"; then
		# On demande à l'utilisateur s'il se connecte en HTTPS (par défaut) ou en SSH à son dépôt en ligne, pour savoir quelle URL utiliser pour le remote "origin"
		if confirm "Avez-vous configuré une connexion SSH avec votre dépôt en ligne ?"; then
			REPO_URL_SSH="$(echo "$REPO_URL" | sed -E 's#https://([^/]+)/([^/]+)/([^/]+)#git@\1:\2/\3.git#')"
			git -C "$PROJECT_DIR" remote add origin "$REPO_URL_SSH"
		else
			if [[ "$REPO_URL" != *.git ]]; then
				REPO_URL="${REPO_URL}.git"
			fi
			git -C "$PROJECT_DIR" remote add origin "$REPO_URL"
		fi
		success "Remote \"origin\" configuré vers $REPO_URL."
	fi
fi

# Vérifier que Node (version >22) et npm sont installés : sinon proposer l'installation et bloquer le script tant que Node et npm ne sont pas installés
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
	warn "Node.js (>22) et/ou npm ne sont pas installés."
	info "Procédure d'installation de Node.js (npm est inclus) : https://nodejs.org/fr/download"
	info "Vous pouvez aussi utiliser Volta pour gérer les versions de Node.js et npm : https://volta.sh/"
	error "Le script ne peut pas continuer sans Node.js (>22) et npm. Installez-les puis relancez le script."
	exit 1
fi

NODE_MAJOR="$(node -v | sed -E 's/^v([0-9]+).*/\1/')"
if [ "$NODE_MAJOR" -lt 22 ]; then
	error "La version de Node.js installée (v${NODE_MAJOR}) est trop ancienne (>22 requis)."
	info "Mettez à jour Node.js (par exemple via nvm : https://github.com/nvm-sh/nvm) puis relancez le script."
	exit 1
fi
success "Node.js ($(node -v)) et npm ($(npm -v)) sont installés."

# lancer npm install
if step "Installation des dépendances npm" "npm install va télécharger les dépendances du projet définies dans package.json."; then
	(cd "$PROJECT_DIR" && npm install)
	success "Dépendances npm installées."
fi

# Proposer l'installation de Taskfile en global si ce n'est pas le cas
if ! command -v task >/dev/null 2>&1; then
	warn "Task (Taskfile.dev) n'est pas installé."
	info "Il est recommandé de l'installer globalement (cela simplifie les commandes pour les tâches récurrentes)."
	info "Procédure d'installation : https://taskfile.dev/#/installation"
else
	success "Task est déjà installé ($(task --version))."
fi

# AVERTISSEMENTS à l'utilisateur
# - On crée dans un dossier `.init` un fichier `init.log` qui contient tout ce qui a été fait par le script
success "Le journal complet de cette initialisation est disponible dans : ${LOG_FILE}"

# - On indique à l'utilisateur qu'il doit choisir une licence pour son projet et qu'il doit modifier le fichier LICENSE en conséquence
warn "N'oubliez pas de choisir une licence pour votre projet et d'adapter le fichier LICENSE en conséquence."

# - On indique à l'utilisateur qu'il doit modifier le fichier README.md pour compléter la documentation de son projet
warn "N'oubliez pas de compléter le fichier README.md avec la documentation de votre projet."

# - On renvoie l'utilisateur à la documentation et à l'onboarding du template pour l'aider à démarrer son projet
info "Pour aller plus loin, consultez la documentation et le guide d'onboarding du template."

echo ""
success "Initialisation du projet terminée !"
log "Fin de l'initialisation du projet."
