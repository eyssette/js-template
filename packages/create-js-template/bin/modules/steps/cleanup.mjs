import { existsSync, rmSync } from "node:fs";
import { TEMPLATE } from "../config.mjs";
import { execSync } from "node:child_process";
import path from "node:path";

function removeInstallerPackage(targetDir) {
	rmSync(path.resolve(targetDir, "packages/create-js-template"), {
		recursive: true,
		force: true,
	});
}

// Supprime .git si on est dans le template original
function removeGitFolderIfOriginalTemplate(targetDir) {
	const actualFirstCommitHash = execSync(
		`git -C "${targetDir}" rev-list --max-parents=0 HEAD 2>/dev/null || true`,
		{ encoding: "utf8" },
	).trim();

	if (actualFirstCommitHash === TEMPLATE.firstCommitHash) {
		rmSync(path.resolve(targetDir, ".git"), { recursive: true, force: true });
		console.log("🗑️  Dossier .git supprimé (template original détecté).");
	}
}

function removeFileIfExists(filePath, fileName) {
	if (existsSync(filePath)) {
		rmSync(filePath);
		console.log(`🗑️  ${fileName} supprimé.`);
	}
}

export function cleanup(targetDir) {
	removeInstallerPackage(targetDir);
	removeGitFolderIfOriginalTemplate(targetDir);
	removeFileIfExists(path.resolve(targetDir, "README.md"), "README.md");
	removeFileIfExists(path.resolve(targetDir, "CHANGELOG.md"), "CHANGELOG.md");
}
