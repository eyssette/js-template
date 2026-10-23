import prompts from "prompts";

// Questions posées à l'utilisateur sur son projet
export function askProjectInfo() {
	return prompts([
		{ type: "text", name: "projectName", message: "Nom du projet ?" },
		{
			type: "text",
			name: "repoUrl",
			message: "URL du dépôt (https://forge.apps.education.fr/...) ?",
		},
		{ type: "text", name: "authorFirstname", message: "Votre prénom ?" },
		{ type: "text", name: "authorName", message: "Votre nom ?" },
		{ type: "text", name: "description", message: "Description du projet ?" },
	]);
}

export function askUseSSH() {
	return prompts({
		type: "confirm",
		name: "value",
		message:
			"Avez-vous configuré une connexion SSH avec votre dépôt en ligne ?",
		initial: false,
	});
}
