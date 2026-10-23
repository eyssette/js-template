// Proposer l'installation de Taskfile en global si ce n'est pas le cas

// On vérifie si Taskfile est installé en global
import { execSync } from "node:child_process";

function isTaskfileInstalled() {
	try {
		execSync("task --version", { stdio: "ignore" });
		return true;
	} catch {
		return false;
	}
}

export function checkTaskfileInstallation() {
	if (!isTaskfileInstalled()) {
		console.warn("\n⚠️ Task (Taskfile.dev) n'est pas installé.");
		console.warn(
			"Il est recommandé de l'installer globalement (cela simplifie les commandes pour les tâches récurrentes).",
		);
		console.warn(
			"Procédure d'installation : https://taskfile.dev/#/installation",
		);
	}
}
