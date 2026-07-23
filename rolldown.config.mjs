// À décommenter si on veut importer des fichiers texte (comme les fichiers Markdown) en tant que chaînes de caractères dans le code JavaScript
// import { string } from "rollup-plugin-string";

import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
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

const RELATIVE_CSS_IMPORT_PATH_REGEX =
	/^(?:\.{1,2}[\\/])[A-Za-z0-9._\-/]+\.css$/;
const CSS_IMPORT_LINE_REGEX = /^(\s*)import\s+['"]([^'"]+\.css)['"]\s*;?\s*$/;
const CSS_EXTENSION_SUFFIX_REGEX = /\.css$/;

// Récupère tous les fichiers CSS du dossier spécifié et de ses sous-dossiers
function getCssFiles(folder) {
	const cssFiles = [];

	function walkDirectory(currentFolderPath) {
		for (const dirent of fs.readdirSync(currentFolderPath, {
			withFileTypes: true,
		})) {
			const entryPath = `${currentFolderPath}${dirent.name}`;

			if (dirent.isSymbolicLink()) {
				continue;
			}

			if (dirent.isDirectory()) {
				walkDirectory(`${entryPath}/`);
				continue;
			}

			if (dirent.isFile() && entryPath.endsWith(".css")) {
				cssFiles.push(entryPath);
			}
		}
	}

	if (fs.existsSync(folder)) {
		walkDirectory(folder);
	}

	return cssFiles;
}

function resolveSafeCssImportPath(jsFile, cssImportPath) {
	if (typeof cssImportPath !== "string" || cssImportPath.includes("\0")) {
		return null;
	}

	// Autorise uniquement des chemins relatifs vers des fichiers .css.
	if (!RELATIVE_CSS_IMPORT_PATH_REGEX.test(cssImportPath)) {
		return null;
	}

	const normalizedImportPath = cssImportPath.replace(/\\/g, "/");
	if (normalizedImportPath.startsWith("/")) {
		return null;
	}

	const baseDirUrl = new URL("./", pathToFileURL(jsFile));
	const resolvedCssUrl = new URL(normalizedImportPath, baseDirUrl);
	const resolvedCssPath = fileURLToPath(resolvedCssUrl);
	const appRootPath = path.resolve(appFolder);
	const relativeToAppRoot = path.relative(appRootPath, resolvedCssPath);

	if (
		relativeToAppRoot.startsWith("..") ||
		path.isAbsolute(relativeToAppRoot)
	) {
		return null;
	}

	return resolvedCssPath;
}

// Récupère tous les fichiers CSS qui sont importés dans le fichier JS principal (main.mjs) et les concatène dans le fichier CSS principal (styles.css)
function getImportedCssFiles(jsFile) {
	const jsContent = fs.readFileSync(jsFile, "utf-8");
	return getImportedCssFilesFromContent(jsFile, jsContent);
}

function getImportedCssFilesFromContent(jsFile, jsContent) {
	const importRegex =
		/^\s*(?:\/\/\s*)?import\s+['"]([^'"]+\.css)['"]\s*;?\s*$/gm;
	const importedCssFiles = [];
	let match;

	while ((match = importRegex.exec(jsContent)) !== null) {
		const cssFilePath = resolveSafeCssImportPath(jsFile, match[1]);
		if (cssFilePath !== null) {
			importedCssFiles.push(cssFilePath);
		}
	}

	return importedCssFiles;
}

function stripCssImportsFromJsContent(jsFile, jsContent, importedCssFiles) {
	const importRegex = CSS_IMPORT_LINE_REGEX;
	const importedCssFilesSet = new Set(importedCssFiles);
	return jsContent
		.split("\n")
		.map((line) => {
			const match = line.match(importRegex);
			if (!match) {
				return line;
			}

			const resolvedImportPath = resolveSafeCssImportPath(jsFile, match[2]);
			if (resolvedImportPath === null) {
				return line;
			}

			if (!importedCssFilesSet.has(resolvedImportPath)) {
				return line;
			}

			return `${match[1]}// ${line.trim()}`;
		})
		.join("\n");
}

// Concatène tous les fichiers CSS importés dans le fichier JS principal (main.mjs) et les enregistre dans une variable pour être minifiés ensuite dans le dossier dist/css
function concatenateImportedCssFiles(importedCssFiles) {
	let concatenatedCss = "";

	for (const cssFile of importedCssFiles) {
		concatenatedCss += fs.readFileSync(cssFile, "utf-8") + "\n";
	}

	return concatenatedCss;
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
			relativePath.replace(CSS_EXTENSION_SUFFIX_REGEX, ".min.css"),
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
const minifyStylesPlugin = (() => {
	let importedCssFilesForBuild = [];
	const mainJsAbsolutePath = path.resolve(mainJsFile);

	return {
		name: "minify-styles",
		buildStart() {
			// Les CSS non importés en JS ne sont pas toujours dans le graphe de modules;
			// on les ajoute explicitement au watch mode pour déclencher un rebuild.
			for (const cssFile of getCssFiles(stylesFolder)) {
				this.addWatchFile(path.resolve(cssFile));
			}
		},
		transform(code, id) {
			if (path.resolve(id) !== mainJsAbsolutePath) {
				return null;
			}

			importedCssFilesForBuild = getImportedCssFilesFromContent(id, code);
			const transformedCode = stripCssImportsFromJsContent(
				id,
				code,
				importedCssFilesForBuild,
			);

			if (transformedCode === code) {
				return null;
			}

			return {
				code: transformedCode,
				map: null,
			};
		},
		writeBundle() {
			if (importedCssFilesForBuild.length === 0) {
				importedCssFilesForBuild = getImportedCssFiles(mainJsFile);
			}

			minifyMainCss(importedCssFilesForBuild);
			minifyNonImportedCssFiles(importedCssFilesForBuild);
		},
	};
})();

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
