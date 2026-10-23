import { readFileSync, writeFileSync } from "node:fs";
import { TEMPLATE } from "../config.mjs";
import path from "node:path";
import { replaceInTextFile } from "../project/file-editing.mjs";

// Fichiers texte : recherche des vraies valeurs actuelles du template
export function customizeTextFiles(targetDir, project) {
	const templateVersion = readFileSync(
		// bearer:disable javascript_lang_path_traversal
		path.resolve(targetDir, "VERSION"),
		"utf8",
	).trim();

	// bearer:disable javascript_lang_path_traversal
	replaceInTextFile(path.resolve(targetDir, "app/index.html"), [
		[
			`<title>${TEMPLATE.name}</title>`,
			`<title>${project.projectName}</title>`,
		],
		[TEMPLATE.description, project.normalizedDescription],
		[project.templateAuthorFullname, project.authorFullname],
	]);

	// bearer:disable javascript_lang_path_traversal
	replaceInTextFile(path.resolve(targetDir, ".cz.toml"), [
		[`version = "${templateVersion}"`, 'version = "0.0.0"'],
		[
			`"commit_url" = "${TEMPLATE.repoUrl}/-/commit/"`,
			`"commit_url" = "${project.repoUrl}/-/commit/"`,
		],
	]);

	replaceInTextFile(
		// bearer:disable javascript_lang_path_traversal
		path.resolve(targetDir, "app/pwa/service-worker/swConfig.mjs"),
		[
			[
				`APP_NAME = "${TEMPLATE.name}"`,
				`APP_NAME = ${JSON.stringify(project.projectName)}`,
			],
			[`APP_VERSION = "${templateVersion}"`, 'APP_VERSION = "0.0.0"'],
		],
	);

	// bearer:disable javascript_lang_path_traversal
	replaceInTextFile(path.resolve(targetDir, "Taskfile.yml"), [
		[TEMPLATE.repoUrl, project.repoUrl],
		[`APP_NAME: "${TEMPLATE.name}"`, `APP_NAME: "${project.normalizedName}"`],
		["forge, github", "origin"],
	]);

	replaceInTextFile(
		// bearer:disable javascript_lang_path_traversal
		path.resolve(targetDir, "scripts/release/create-zipped-dist-from-tag.sh"),
		[[`APP_NAME="${TEMPLATE.name}"`, `APP_NAME="${project.normalizedName}"`]],
	);

	const currentYear = new Date().getFullYear();

	// bearer:disable javascript_lang_path_traversal
	replaceInTextFile(path.resolve(targetDir, "LICENSE"), [
		[`2025 ${TEMPLATE.creatorName}`, `${currentYear} ${project.authorName}`],
	]);

	// bearer:disable javascript_lang_path_traversal
	writeFileSync(path.resolve(targetDir, "VERSION"), "0.0.0");
}
