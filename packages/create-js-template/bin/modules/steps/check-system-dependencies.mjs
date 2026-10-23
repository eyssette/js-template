import { MINIMUM_NODE_VERSION } from "../config.mjs";
import { execSync } from "node:child_process";

function checkGit() {
	try {
		execSync("git --version", { stdio: "ignore" });
	} catch {
		console.error(
			"❌ Git n'est pas installé. Veuillez l'installer avant de continuer.",
		);
		console.error(
			"Pour l'installer, consultez la documentation officielle : https://git-scm.com/install/",
		);
		process.exit(1);
	}
}

function checkNode() {
	try {
		const nodeVersion = execSync("node --version", { encoding: "utf8" });
		// Retire le 'v' et convertit en nombre
		const majorVersion = Math.trunc(Number(nodeVersion.slice(1)));
		if (majorVersion < MINIMUM_NODE_VERSION) {
			// bearer:disable javascript_lang_logger_leak
			console.error(
				`❌ La version de Node.js (${nodeVersion}) est trop ancienne (>22 requis).`,
			);
			console.error(
				"Mettez à jour Node.js (par exemple via nvm) puis relancez le script.",
			);
			process.exit(1);
		}
	} catch {
		console.error(
			"❌ Node.js ou npm n'est pas installé. Veuillez les installer avant de continuer.",
		);
		console.error(
			"Pour l'installer, consultez la documentation officielle : https://nodejs.org/fr/download",
		);
		process.exit(1);
	}
}

export function checkSystemDependencies() {
	console.log("🔍 Vérification des dépendances système...");
	checkGit();
	checkNode();
	console.log("✅ Dépendances système vérifiées.");
}
