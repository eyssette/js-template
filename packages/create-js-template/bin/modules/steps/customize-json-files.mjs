import { TEMPLATE } from "../config.mjs";
import path from "node:path";
import { toGitUrl } from "../project/project-info.mjs";
import { updateJsonFile } from "../project/file-editing.mjs";

function updatePackageJson(pkg, project) {
	let repositoryUrl;
	if (pkg && pkg.repository && typeof pkg.repository.url === "string") {
		repositoryUrl = pkg.repository.url
			.split(toGitUrl(TEMPLATE.repoUrl))
			.join(toGitUrl(project.repoUrl));
	} else {
		repositoryUrl = pkg && pkg.repository ? pkg.repository.url : undefined;
	}

	return {
		...pkg,
		name: project.normalizedName,
		description: project.description,
		version: "0.0.0",
		author: project.authorFullname,
		...(pkg.repository
			? {
					repository: {
						...pkg.repository,
						url: repositoryUrl,
					},
				}
			: {}),
	};
}

// Fichiers JSON : traités par champ, pas par recherche de texte
export function customizeJsonFiles(targetDir, project) {
	updateJsonFile(path.resolve(targetDir, "package.json"), (pkg) =>
		updatePackageJson(pkg, project),
	);

	updateJsonFile(path.resolve(targetDir, "package-lock.json"), (pkgLock) => ({
		...pkgLock,
		name: project.normalizedName,
		version: "0.0.0",
	}));

	updateJsonFile(
		path.resolve(targetDir, "app/pwa/manifest.webmanifest"),
		(manifest) => ({
			...manifest,
			name: project.projectName,
			short_name: project.projectName,
		}),
	);
}
