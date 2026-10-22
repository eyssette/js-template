import { customizeJsonFiles } from "./customize-json-files.mjs";
import { customizeTextFiles } from "./customize-text-files.mjs";

export function customizeProjectFiles(targetDir, project) {
	customizeJsonFiles(targetDir, project);
	customizeTextFiles(targetDir, project);
}
