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

const development =
	process.env.NODE_ENV && process.env.NODE_ENV === "development";

// Récupère tous les fichiers CSS du dossier spécifié et de ses sous-dossiers
function getCssFiles(folder) {
	return fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
		const filePath = path.join(folder, entry.name);
		if (entry.isDirectory()) {
			return getCssFiles(filePath);
		}
		return entry.isFile() && entry.name.endsWith(".css") ? [filePath] : [];
	});
}

// Minifie les fichiers CSS du dossier "app/css" et les enregistre dans le dossier dist/css
function minifyStyles() {
	for (const stylesCssFile of getCssFiles(stylesFolder)) {
		const relativePath = path.relative(stylesFolder, stylesCssFile);
		const stylesMinCssFile = path.join(
			distStylesFolder,
			relativePath.replace(/\.css$/, ".min.css"),
		);
		// On utilise LightningCSS pour minifier le fichier CSS et on l'enregistre dans le dossier dist/css
		const { code } = transform({
			filename: stylesCssFile,
			code: fs.readFileSync(stylesCssFile),
			minify: true,
		});
		fs.mkdirSync(path.dirname(stylesMinCssFile), { recursive: true });
		fs.writeFileSync(stylesMinCssFile, code);
		// On affiche dans la console un message pour indiquer que le fichier CSS a été minifié
		const stats = fs.statSync(stylesMinCssFile);
		const size = (stats.size / 1024).toFixed(2) + " kB";
		console.log(
			`\x1b[90m<DIR>/\x1b[0m\x1b[34m${path.relative(distFolder, stylesMinCssFile)}\x1b[0m  \x1b[90mchunk │ size: ${size}\x1b[0m`,
		);
	}
}

// Plugin pour minifier les fichiers CSS après la compilation
const minifyStylesPlugin = {
	name: "minify-styles",
	writeBundle() {
		minifyStyles();
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
