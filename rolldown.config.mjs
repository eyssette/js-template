// À décommenter si on veut importer des fichiers texte (comme les fichiers Markdown) en tant que chaînes de caractères dans le code JavaScript
// import { string } from "rollup-plugin-string";

import fs from "fs";
import path from "path";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { transform } from "lightningcss";

const appFolder = "app/";
const distFolder = "dist/";
const stylesFolder = appFolder + "css/";
const distStylesFolder = distFolder + "css/";
const mainJsFile = appFolder + "js/main.mjs";

const development =
	process.env.NODE_ENV && process.env.NODE_ENV === "development";

// Récupère tous les fichiers CSS du dossier spécifié et de ses sous-dossiers
function getCssFiles(folder) {
	return fs.globSync(`${folder}**/*.css`);
}

// Récupère tous les fichiers CSS qui sont importés dans le fichier JS principal (main.mjs) et les concatène dans le fichier CSS principal (styles.css)
function getImportedCssFiles(jsFile) {
	const jsContent = fs.readFileSync(jsFile, "utf-8");
	const importRegex =
		/^\s*(?:\/\/\s*)?import\s+['"]([^'"]+\.css)['"]\s*;?\s*$/gm;
	const importedCssFiles = [];
	let match;

	while ((match = importRegex.exec(jsContent)) !== null) {
		const cssFilePath = path.resolve(path.dirname(jsFile), match[1]);
		importedCssFiles.push(cssFilePath);
	}

	return importedCssFiles;
}

function commentCssImportsInMainJs(jsFile, importedCssFiles) {
	let jsContent = fs.readFileSync(jsFile, "utf-8");

	for (const cssFile of importedCssFiles) {
		const relativePath = path.relative(path.dirname(jsFile), cssFile);
		const importRegex = new RegExp(
			`^(\\s*)import\\s+['"]${relativePath.replace(/\\/g, "\\\\")}['"]\\s*;?\\s*$`,
			"gm",
		);
		jsContent = jsContent.replace(importRegex, (match, indent) => {
			return `${indent}// ${match.trim()}`;
		});
	}

	fs.writeFileSync(jsFile, jsContent);
}

// Concatène tous les fichiers CSS importés dans le fichier JS principal (main.mjs) et les enregistre dans une variable pour être minifiés ensuite dans le dossier dist/css
function concatenateImportedCssFiles(importedCssFiles) {
	let concatenatedCss = "";

	for (const cssFile of importedCssFiles) {
		concatenatedCss += fs.readFileSync(cssFile, "utf-8") + "\n";
	}

	return concatenatedCss;
}

function restoreMainJsContent(originalMainJsContent) {
	fs.writeFileSync(mainJsFile, originalMainJsContent);
}

function logGeneratedChunk(filePath) {
	const stats = fs.statSync(filePath);
	const size = (stats.size / 1024).toFixed(2) + " kB";
	console.log(
		`\x1b[90m<DIR>/\x1b[0m\x1b[34m${path.relative(distFolder, filePath)}\x1b[0m  \x1b[90mchunk │ size: ${size}\x1b[0m`,
	);
}

function minifyCssToFile(inputCss, sourceFile, outputFile) {
	const sourceCode = Buffer.isBuffer(inputCss)
		? inputCss
		: Buffer.from(inputCss, "utf-8");
	const { code } = transform({
		filename: sourceFile,
		code: sourceCode,
		minify: true,
	});

	fs.mkdirSync(path.dirname(outputFile), { recursive: true });
	fs.writeFileSync(outputFile, code);
	logGeneratedChunk(outputFile);
}

const originalMainJsContentForBuild = fs.readFileSync(mainJsFile, "utf-8");
const importedCssFilesForBuild = getImportedCssFiles(mainJsFile);
commentCssImportsInMainJs(mainJsFile, importedCssFilesForBuild);

let mainJsRestored = false;
const restoreMainJsAfterBuild = () => {
	if (!mainJsRestored) {
		restoreMainJsContent(originalMainJsContentForBuild);
		mainJsRestored = true;
	}
};

process.once("exit", restoreMainJsAfterBuild);

// Minifie le fichier CSS principal (styles.css) et l'enregistre dans le dossier dist/css
function minifyMainCss(importedCssFiles) {
	const concatenatedCss = concatenateImportedCssFiles(importedCssFiles);
	const mainCssFile = path.join(distStylesFolder, "styles.css");
	const mainMinCssFile = path.join(distStylesFolder, "styles.min.css");
	minifyCssToFile(concatenatedCss, mainCssFile, mainMinCssFile);
}

// Minifie les fichiers CSS non importés du dossier "app/css" et les enregistre dans le dossier dist/css
function minifyNonImportedCssFiles(importedCssFiles) {
	for (const stylesCssFile of getCssFiles(stylesFolder)) {
		const relativePath = path.relative(stylesFolder, stylesCssFile);
		const stylesMinCssFile = path.join(
			distStylesFolder,
			relativePath.replace(/\.css$/, ".min.css"),
		);
		// On ignore le fichier si c'est le fichier CSS principal (styles.css) car il a déjà été minifié dans la fonction minifyMainCss()
		if (path.basename(stylesCssFile) === "styles.css") {
			continue;
		}
		// On ignore le fichier si c'est un fichier importé dans le fichier JS principal (main.mjs) car a déjà été intégré et minifié dans le fichier CSS principal (styles.css)
		const stylesCssFileAbsolute = path.resolve(stylesCssFile);
		if (importedCssFiles.includes(stylesCssFileAbsolute)) {
			continue;
		}
		minifyCssToFile(
			fs.readFileSync(stylesCssFile),
			stylesCssFile,
			stylesMinCssFile,
		);
	}
}

// Plugin pour minifier les fichiers CSS après la compilation
const minifyStylesPlugin = {
	name: "minify-styles",
	writeBundle() {
		try {
			minifyMainCss(importedCssFilesForBuild);
			minifyNonImportedCssFiles(importedCssFilesForBuild);
		} finally {
			restoreMainJsAfterBuild();
		}
	},
};

// Configuration de la compilation avec Rolldown
export default {
	input: appFolder + "js/main.mjs",
	output: {
		file: distFolder + "script.min.js",
		format: "iife",
		sourcemap: true,
		minify: true,
	},
	plugins: [
		// Importe des fichiers texte (comme les fichiers Markdown) en tant que chaînes de caractères dans le code JavaScript
		// string({
		// 	include: appFolder + "*.md",
		// }),

		// Supprime le contenu du dossier dist avant de compiler
		del({ targets: "dist" }),

		// Copie les fichiers du dossier app vers le dossier dist
		copy({
			targets: [
				{
					src: [appFolder + "**/*"],
					dest: distFolder,
				},
			],
			flatten: false,
		}),

		minifyStylesPlugin,

		// En mode développement, lance un serveur de développement et recharge la page automatiquement lorsqu'un fichier est modifié
		development && serve({ contentBase: ["dist", "./"], open: true }),
		development && livereload({ delay: 300 }),
	],
};
