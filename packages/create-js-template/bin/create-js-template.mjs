#!/usr/bin/env node
// oxlint-disable import/max-dependencies
import {
	clearState,
	loadState,
	runStep,
	saveState,
} from "./modules/project/state.mjs";
import {
	configureRemote,
	initGitRepository,
	installDependencies,
} from "./modules/steps/init-git-repository.mjs";
import { askProjectInfo } from "./modules/steps/ask-project-info.mjs";
import { buildProjectInfo } from "./modules/project/project-info.mjs";
import { checkSystemDependencies } from "./modules/steps/check-system-dependencies.mjs";
import { cleanup } from "./modules/steps/cleanup.mjs";
import { customizeProjectFiles } from "./modules/steps/customize-project-files.mjs";
import { downloadTemplate } from "./modules/steps/download-template.mjs";
import { generateReadme } from "./modules/steps/generate-readme.mjs";
import { printSummary } from "./modules/steps/print-summary.mjs";
import { resolveTargetDir } from "./modules/steps/check-target.mjs";

const targetDir = resolveTargetDir();
const state = loadState(targetDir);
const projectContext = { targetDir, state };

await runStep("download", () => downloadTemplate(targetDir), projectContext);

// Les réponses sont conservées pour ne pas reposer les questions après un échec
if (!state.answers) {
	state.answers = await askProjectInfo();
	saveState(targetDir, state);
}
const project = buildProjectInfo(state.answers);

checkSystemDependencies();

const steps = [
	["customize", () => customizeProjectFiles(targetDir, project)],
	["cleanup", () => cleanup(targetDir)],
	["readme", () => generateReadme(targetDir, project)],
	["install", () => installDependencies(targetDir)],
	["git", () => initGitRepository(targetDir)],
	["remote", () => configureRemote(targetDir, project.repoUrl)],
];
for (const [name, step] of steps) {
	// oxlint-disable-next-line no-await-in-loop
	await runStep(name, step, projectContext);
}

clearState(targetDir);
printSummary(project.projectName, targetDir);
