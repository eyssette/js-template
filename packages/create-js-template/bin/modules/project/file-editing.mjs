import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { JSON_INDENTATION } from "../config.mjs";

export function updateJsonFile(filePath, updater) {
	if (!existsSync(filePath)) {
		return;
	}
	const json = JSON.parse(readFileSync(filePath, "utf8"));
	const updatedJson = updater(structuredClone(json));
	writeFileSync(
		filePath,
		`${JSON.stringify(updatedJson ?? json, undefined, JSON_INDENTATION)}\n`,
	);
}

export function replaceInTextFile(filePath, replacements) {
	if (!existsSync(filePath)) {
		return;
	}
	let content = readFileSync(filePath, "utf8");
	for (const [search, value] of replacements) {
		content = content.split(search).join(value ?? "");
	}
	writeFileSync(filePath, content);
}
