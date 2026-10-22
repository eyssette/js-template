import { readFileSync, writeFileSync } from "node:fs";
import { TEMPLATE } from "../config.mjs";
import path from "node:path";
import { replaceInTextFile } from "../project/file-editing.mjs";

// Fichiers texte : recherche des vraies valeurs actuelles du template
export function customizeTextFiles(targetDir, project) {
	const templateVersion = readFileSync(
		path.resolve(targetDir, "VERSION"),
		"utf8",
	).trim();

	replaceInTextFile(path.resolve(targetDir, "app/index.html"), [
		[
			`<title>${TEMPLATE.name}</title>`,
			`<title>${project.projectName}</title>`,
		],
		[TEMPLATE.description, project.description],
		[project.templateAuthorFullname, project.authorFullname],
	]);

	replaceInTextFile(path.resolve(targetDir, ".cz.toml"), [
		[`version = "${templateVersion}"`, 'version = "0.0.0"'],
		[
			`"commit_url" = "${TEMPLATE.repoUrl}/-/commit/"`,
			`"commit_url" = "${project.repoUrl}/-/commit/"`,
		],
	]);

	replaceInTextFile(
		path.resolve(targetDir, "app/pwa/service-worker/swConfig.mjs"),
		[
			[
				`APP_NAME = "${TEMPLATE.name}"`,
				`APP_NAME = ${JSON.stringify(project.projectName)}`,
			],
			[`APP_VERSION = "${templateVersion}"`, 'APP_VERSION = "0.0.0"'],
		],
	);

	replaceInTextFile(path.resolve(targetDir, "Taskfile.yml"), [
		[TEMPLATE.repoUrl, project.repoUrl],
		[TEMPLATE.name, project.projectName],
		["forge, github", "origin"],
	]);

	replaceInTextFile(
		path.resolve(targetDir, "scripts/release/create-zipped-dist-from-tag.sh"),
		[[`ZIP_NAME="${TEMPLATE.name}"`, `ZIP_NAME="${project.normalizedName}"`]],
	);

	writeFileSync(path.resolve(targetDir, "VERSION"), "0.0.0");
}
