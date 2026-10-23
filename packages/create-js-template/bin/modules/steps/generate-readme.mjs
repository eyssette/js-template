import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { TEMPLATE } from "../config.mjs";
import path from "node:path";

// Génération du README.md à partir du template
export function generateReadme(targetDir, project) {
	const readmeTemplatePath = path.resolve(
		targetDir,
		"scripts/init/README-template.md",
	);
	if (!existsSync(readmeTemplatePath)) {
		return;
	}

	const content = readFileSync(readmeTemplatePath, "utf8")
		.replaceAll("{{project_name}}", project.projectName)
		.replaceAll("{{project_description}}", project.normalizedDescription)
		.replaceAll("{{user_name}}", project.authorName)
		.replaceAll("{{user_firstname}}", project.authorFirstname)
		.replaceAll("{{repo_url}}", project.repoUrl)
		.replaceAll("{{template_name}}", TEMPLATE.name)
		.replaceAll("{{template_creator_firstname}}", TEMPLATE.creatorFirstname)
		.replaceAll("{{template_creator_name}}", TEMPLATE.creatorName)
		.replaceAll("{{template_url}}", TEMPLATE.repoUrl);

	writeFileSync(path.resolve(targetDir, "README.md"), content);
	console.log("📄 README.md généré à partir du template.");
}
