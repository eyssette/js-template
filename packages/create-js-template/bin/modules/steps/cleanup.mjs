import { existsSync, rmSync } from "node:fs";
import { TEMPLATE } from "../config.mjs";
import { execSync } from "node:child_process";
import path from "node:path";

function removeInstallerPackage(targetDir) {
	// bearer:disable javascript_lang_path_traversal
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

	// bearer:disable javascript_lang_observable_timing, javascript_lang_path_traversal
	if (actualFirstCommitHash === TEMPLATE.firstCommitHash) {
		rmSync(path.resolve(targetDir, ".git"), { recursive: true, force: true });
		// bearer:disable javascript_lang_logger_leak
		console.log("🗑️  Dossier .git supprimé (template original détecté).");
	}
}

function removeFileIfExists(filePath, fileName) {
	if (existsSync(filePath)) {
		rmSync(filePath);
		// bearer:disable javascript_lang_logger_leak
		console.log(`🗑️  ${fileName} supprimé.`);
	}
}

export function cleanup(targetDir) {
	removeInstallerPackage(targetDir);
	removeGitFolderIfOriginalTemplate(targetDir);
	// bearer:disable javascript_lang_path_traversal
	removeFileIfExists(path.resolve(targetDir, "README.md"), "README.md");
	// bearer:disable javascript_lang_path_traversal
	removeFileIfExists(path.resolve(targetDir, "CHANGELOG.md"), "CHANGELOG.md");
}
