import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { STATE_FILE_NAME } from "../config.mjs";
import path from "node:path";

const STATE_INDENTATION = 2;

const statePath = (targetDir) => path.resolve(targetDir, STATE_FILE_NAME);

export function hasState(targetDir) {
	return existsSync(statePath(targetDir));
}

// Lit l'état sauvegardé : réponses de l'utilisateur et étapes terminées
export function loadState(targetDir) {
	if (!hasState(targetDir)) {
		return { completed: [] };
	}
	try {
		return JSON.parse(readFileSync(statePath(targetDir), "utf8"));
	} catch {
		return { completed: [] };
	}
}

export function saveState(targetDir, state) {
	writeFileSync(
		statePath(targetDir),
		JSON.stringify(state, undefined, STATE_INDENTATION),
	);
}

export function clearState(targetDir) {
	rmSync(statePath(targetDir), { force: true });
}

// Exécute une étape sauf si elle est déjà terminée lors d'un lancement précédent
export async function runStep(name, step, projectContext) {
	const { targetDir, state } = projectContext;
	if (state.completed.includes(name)) {
		// bearer:disable javascript_lang_logger_leak
		console.log(`⏭️  Étape "${name}" déjà effectuée, on passe.`);
		return;
	}
	await step();
	state.completed.push(name);
	saveState(targetDir, state);
}
