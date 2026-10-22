import { TEMPLATE_REPO } from "../config.mjs";
import { execSync } from "node:child_process";
import path from "node:path";
import { rmSync } from "node:fs";

export function downloadTemplate(targetDir) {
	console.log("📦 Téléchargement du template...");
	execSync(`git clone --depth 1 ${TEMPLATE_REPO} "${targetDir}"`, {
		stdio: "inherit",
	});
	rmSync(path.resolve(targetDir, ".git"), { recursive: true, force: true });
}
