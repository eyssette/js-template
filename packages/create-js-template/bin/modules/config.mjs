export const TEMPLATE_REPO =
	"https://forge.apps.education.fr/eyssette/js-template.git";
export const DEFAULT_TARGET_DIR_INDEX = 2;
export const DEFAULT_TARGET_DIR = ".";
export const JSON_INDENTATION = 2;
export const STATE_FILE_NAME = ".create-js-template-state.json";
export const MINIMUM_NODE_VERSION = 22;

// Valeurs réelles actuelles du template : ce sont elles qu'on recherche
// dans les fichiers, pas des tokens génériques (le template doit rester
// un projet fonctionnel et clonable tel quel).
export const TEMPLATE = {
	name: "js-template",
	description:
		"Environnement de développement JavaScript pré-configuré et optimisé.Éditeur de code qui vérifie la qualité du code, le formate automatiquement et facilite le débogage, Tâches automatisées pour compiler, tester, pousser, déployer et vérifier l’application. Pré-configuration pour agents IA avec des SKILLS déjà définis. Gestion de l'internationalisation et du mode PWA (Progressive Web App) pour utilisation hors ligne.",
	creatorFirstname: "Cédric",
	creatorName: "Eyssette",
	repoUrl: "https://forge.apps.education.fr/eyssette/js-template",
	firstCommitHash: "679fdff65fc5115dbf85b32dd0b93c13ced6084e",
};
