#!/usr/bin/env node
// oxlint-disable no-console

// oxlint-disable-next-line import/no-nodejs-modules
import fs from "node:fs";

const args = process.argv.slice(2);

const usage = "❌ Usage: task release-draft -- <old_tag> <new_tag>";

if (args.length < 7 || args.length > 11) {
	console.error(usage);
	process.exit(1);
}

const [
	APP_NAME = "",
	VERSION = "",
	RELEASE_DATE = "",
	CHANGELOG_URL = "",
	ISSUES_URL = "",
	TAG_OLD = "",
	TAG_NEW = "",
] = args;

if (!TAG_OLD || !TAG_NEW) {
	console.error(usage);
	process.exit(1);
}

const placeholders = {
	WHAT_NEW: "<!-- Indiquer ici les nouveautés et améliorations -->",
	BUG_FIXES_AND_MINOR_CHANGES:
		"<!-- Indiquer ici les corrections de bugs et changements mineurs -->",
	BREAKING_CHANGES:
		"<!-- Indiquer ici les changements qui cassent la compatibilité avec les versions précédentes et demandent aux utilisateurs de faire attention lors de la mise à jour -->",
	TECHNICAL_DETAILS:
		"<!-- Indiquer ici les éventuels détails techniques de la release -->",
};

const data = {
	APP_NAME,
	VERSION,
	RELEASE_DATE,
	CHANGELOG_URL,
	ISSUES_URL,
	WHAT_NEW: args.length >= 8 ? args[7] : placeholders.WHAT_NEW,
	BUG_FIXES_AND_MINOR_CHANGES:
		args.length >= 9 ? args[8] : placeholders.BUG_FIXES_AND_MINOR_CHANGES,
	BREAKING_CHANGES: args.length >= 10 ? args[9] : placeholders.BREAKING_CHANGES,
	TECHNICAL_DETAILS:
		args.length >= 11 ? args[10] : placeholders.TECHNICAL_DETAILS,
};

let template = fs.readFileSync("scripts/release/release-template.md", "utf8");

template = template.replaceAll(
	/\{%\s*if\s+(?<variable>[A-Z_][A-Z0-9_]*)\s*%\}(?<block>[\s\S]*?)\{%\s*endif\s*%\}/gu,
	(_match, variable, block) =>
		data[variable] && data[variable].trim() ? block : "",
);

template = template.replaceAll(
	/\{\{\s*(?<variable>[A-Z_][A-Z0-9_]*)\s*\}\}/gu,
	(_match, variable) => data[variable] ?? "",
);

// Évite les lignes vides résiduelles quand des blocs "if" sont supprimés.
template = `${template
	.replaceAll(/[ \t]+\n/gu, "\n")
	.replaceAll(/\n{3,}/gu, "\n\n")
	.trimEnd()}\n`;

process.stdout.write(template);
