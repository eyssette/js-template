import { STATE_FILE_NAME, TEMPLATE } from "../config.mjs";
import { askUseSSH } from "./ask-project-info.mjs";
import { execSync } from "node:child_process";
import { toGitUrl } from "../project/project-info.mjs";

export function installDependencies(targetDir) {
	console.log("🔧 Installation des dépendances...");
	execSync("npm install", { cwd: targetDir, stdio: "inherit" });
}

export function initGitRepository(targetDir) {
	console.log("🌱 Initialisation du dépôt git...");
	const options = { cwd: targetDir, stdio: "inherit" };
	execSync("git init -b main", options);
	execSync(`git add -A -- . ':!${STATE_FILE_NAME}'`, options);
	execSync(
		`git commit -m "feat(init): initialisation du projet à partir du template ${TEMPLATE.name}"`,
		options,
	);
	execSync("git tag -f 0.0.0", options);
}

export async function configureRemote(targetDir, repoUrl) {
	console.log("🔄 Configuration des remotes Git...");
	const useSSH = await askUseSSH();

	let remoteUrl = repoUrl;
	if (useSSH.value) {
		remoteUrl = toGitUrl(repoUrl);
	} else if (!repoUrl.endsWith(".git")) {
		remoteUrl = `${repoUrl}.git`;
	}

	execSync(
		`git remote add origin ${remoteUrl} || git remote set-url origin ${remoteUrl}`,
		{
			cwd: targetDir,
			stdio: "inherit",
		},
	);
	console.log(`✅ Remote "origin" configuré vers ${remoteUrl}`);
}
