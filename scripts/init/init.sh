# Ce script permet d'initialiser la création d'un nouveau projet à partir de ce template.
# Il permet de repartir à zéro en supprimant les fichiers et dossiers spécifiques à ce template

## CONSTANTES définies dans le script
## template_name : nom du template
## template_url : URL du dépôt du template
## user_name et user_firstname : nom et prénom de l'utilisateur

# IMPORTANT :
# - ATTENTION : blocage initial si le dossier de l'application s'appelle "{{template_name}}" (= le nom du template) et demande à l'utilisateur d'abord de renommer le dossier avant de continuer
# - ATTENTION : indiquer dès le début que le script va réinitialiser le projet, et demander à l'utilisateur de confirmer qu'il veut continuer
# - Avertissement à chaque étape (on indique bien ce qu'on va faire et pourquoi) et demande de confirmation pour continuer

# SUPPRESSIONS :

# 1. Suppression du dossier .git s'il existe
# 2. Suppression du CHANGELOG.md
# 3. Suppression du README.md

# CHANGEMENT :
# - changement du numéro de version par 0.0.0 dans les fichiers : VERSION (le fichier ne contient que le numéro de version), package.json (champ : "version"), package-lock.json (champ : "version"), .cz.toml (champ : version)
# - Demande à l'utilisateur du nom du projet et changement du nom "{{template_name}}" par le nom du projet dans les fichiers : package.json et package-lock.json (champ "name" : sans espaces, sans majuscules, sans caractères spéciaux), Taskfile.yml (seulement dans le champ : APP_NAME ; ne pas modifier les autres occurrences), /scripts/release/create-zipped-dist-from-tag.sh (champ : ZIP_NAME).
# - Demande à l'utilisateur de l'URL du dépôt principal (on indique à l'utilisateur la forme que doit avoir l'URL du template : https://forge.apps.education.fr/<group>/<project> ) et on remplace "{{template_url}}" par l'URL du dépôt principal dans les fichiers :.cz.toml (champ : extras.commit_url), Taskfile.yml (champ : MAIN_REPO_URL)
# - Demander à l'utilisateur s'il souhaite utiliser un autre répertoire pour l'application, autre que le dépôt principal. Si non, remplacer "force, github" dans Taskfile.yml par "origin". Si oui, demander le nom de ce dépôt et remplacer "force, github" par "origin, <nom_du_dépôt>" dans Taskfile.yml
# - Demande à l'utilisateur son prénom, puis son nom. On remplace le nom "{{user_name}}" par le nom de l'utilisateur dans les fichiers : LICENSE, et prénom nom "{{user_first_name}} {{user_name}}" par le prénom et nom de l'utilisateur dans les fichiers : package.json (champ : author).

# CREATION :
# - création d'un fichier README.md à partir d'un template README.md (README-template.md) avec en arguments : le nom du projet, le prénom et nom de l'utilisateur, l'URL du dépôt principal

# GIT :
# - Vérification que git est installée : sinon proposer l'installation de git et bloquer le script tant que git n'est pas installé
# - initialisation d'un nouveau dépôt git avec une branche principale nommée "main"
# - création d'un commit initial avec le message "feat(init): initialisation du projet à partir du template {{template_name}}"
# - création d'un tag initial nommé "0.0.0"

# Vérifier que Node (version >22) et npm sont installés : sinon proposer l'installation et bloquer le script tant que Node et npm ne sont pas installés
# lancer npm install
# Proposer l'installation de Taskfile en global si ce n'est pas le cas

# AVERTISSEMENTS à l'utilisateur
# - On crée dans un dossier `.init` un fichier `init.log` qui contient tout ce qui a été fait par le script
# - On indique à l'utilisateur qu'il doit choisir une licence pour son projet et qu'il doit modifier le fichier LICENSE en conséquence
# - On indique à l'utilisateur qu'il doit modifier le fichier README.md pour compléter la documentation de son projet
# - On renvoie l'utilisateur à la documentation et à l'onboarding du template pour l'aider à démarrer son projet
