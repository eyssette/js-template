import { TEMPLATE } from "../config.mjs";

const REPO_HTTPS_PATTERN =
	/https:\/\/(?<host>[^/]+)\/(?<owner>[^/]+)\/(?<repo>[^/]+)/u;

export function toGitUrl(httpsUrl) {
	return httpsUrl.replace(
		REPO_HTTPS_PATTERN,
		"git@$<host>:$<owner>/$<repo>.git",
	);
}

// Regroupe les réponses de l'utilisateur et les valeurs qui en sont dérivées
export function buildProjectInfo(answers) {
	return {
		...answers,
		normalizedName: answers.projectName
			.toLowerCase()
			.trim()
			.replaceAll(/\s+/gu, "-")
			// On remplace les accents par leur équivalent non accentué
			.normalize("NFD")
			.replaceAll(/[\u0300-\u036F]/gu, "")
			// On garde uniquement les caractères autorisés dans un nom de projet npm
			.replaceAll(/[^a-z0-9._-]/gu, ""),
		authorFullname: `${answers.authorFirstname} ${answers.authorName}`,
		templateAuthorFullname: `${TEMPLATE.creatorFirstname} ${TEMPLATE.creatorName}`,
		normalizedDescription:
			// On remplace juste les éventuels guillemets droits par des guillemets typographiques pour éviter les problèmes d'échappement dans les fichiers JSON
			answers.description.replaceAll(/"/gu, "”"),
	};
}
