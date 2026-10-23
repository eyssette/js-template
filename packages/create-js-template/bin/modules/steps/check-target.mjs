import {
	DEFAULT_TARGET_DIR,
	DEFAULT_TARGET_DIR_INDEX,
	TEMPLATE,
} from "../config.mjs";
import { existsSync } from "node:fs";
import { hasState } from "../project/state.mjs";
import path from "node:path";

// Détermine le dossier cible (premier argument, ou dossier courant) et le valide
export function resolveTargetDir() {
	const targetDirArg =
		process.argv[DEFAULT_TARGET_DIR_INDEX] || DEFAULT_TARGET_DIR;
	const targetDir = path.resolve(process.cwd(), targetDirArg);

	if (path.basename(targetDir) === TEMPLATE.name) {
		// bearer:disable javascript_lang_logger_leak
		console.error(
			`❌ Renommez le dossier "${TEMPLATE.name}" avant de relancer ce script.`,
		);
		process.exit(1);
	}

	if (hasState(targetDir)) {
		console.log("🔁 Installation interrompue détectée : reprise.");
		return targetDir;
	}

	if (existsSync(targetDir) && targetDirArg !== DEFAULT_TARGET_DIR) {
		// bearer:disable javascript_lang_logger_leak
		console.error(`❌ Le dossier "${targetDirArg}" existe déjà.`);
		process.exit(1);
	}

	return targetDir;
}
