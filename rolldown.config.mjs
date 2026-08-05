// oxlint-disable unicorn/no-null import/no-nodejs-modules
// À décommenter si on veut importer des fichiers texte (comme les fichiers Markdown) en tant que chaînes de caractères dans le code JavaScript
// import { string } from "rollup-plugin-string";

import copy from "rollup-plugin-copy";
import { createMinifyStylesPlugin } from "./scripts/build/minify-css.mjs";
import del from "rollup-plugin-delete";
import livereload from "rollup-plugin-livereload";
import path from "node:path";
import serve from "rollup-plugin-serve";

// Version ECMAScript utilisée pour la compilation
const ECMA_VERSION = "es2020";

const appFolder = "app/";
const distFolder = "dist/";
const mainJsFileName = "main.mjs";
const scriptMinJsFileName = "script.min.js";
const cssFolder = "css/";

const mainJsFile = `${appFolder}js/${mainJsFileName}`;

const minifyStylesPluginOptions = {
	mainJsAbsolutePath: path.resolve(mainJsFile),
	appRootPath: path.resolve(appFolder),
	stylesRootPath: path.resolve(`${appFolder}${cssFolder}`),
	distRootPath: path.resolve(distFolder),
	distStylesFolder: cssFolder,
};

const development =
	process.env.NODE_ENV &&
	(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "debug");
const debug = development && process.env.NODE_ENV === "debug";

const analyze = String(process.env.ANALYZE).toLowerCase() === "true";

async function getVisualizerPlugin() {
	if (!analyze) {
		return null;
	}

	const { visualizer } = await import("rollup-plugin-visualizer");
	return visualizer({
		filename: ".report/bundle-size/rollup-visualizer.html",
		title: "Rollup Visualizer",
		sourcemap: true,
	});
}

// Configuration de la compilation avec Rolldown
async function createBuildConfig() {
	return [
		// Configuration de la compilation en IIFE (utilisé si le navigateur ne supporte pas les modules : ce qui est le cas notamment si l'application est ouverte en local dans un navigateur, sans serveur web)
		{
			input: mainJsFile,
			output: {
				file: distFolder + scriptMinJsFileName,
				format: "iife",
				sourcemap: true,
				// En développement, on évite le mangle pour faciliter le débogage.
				minify: debug ? false : { mangle: true },
				strict: true,
			},
			transform: {
				target: ECMA_VERSION,
			},
			plugins: [
				// Importe des fichiers texte (comme les fichiers Markdown) en tant que chaînes de caractères dans le code JavaScript
				// string({
				// 	include: appFolder + "*.md",
				// }),

				// Supprime le contenu du dossier dist avant de compiler
				del({ targets: "dist/*" }),

				// Copie les fichiers du dossier app vers le dossier dist
				copy({
					targets: [{ src: [`${appFolder}**/*`], dest: distFolder }],
					flatten: false,
				}),

				// Concatène et minifie les CSS (importés en JS + fichiers autonomes du dossier styles)
				createMinifyStylesPlugin(minifyStylesPluginOptions),

				// En mode développement, lance un serveur de développement et recharge la page automatiquement lorsqu'un fichier est modifié
				development && serve({ contentBase: ["dist", "./"], open: !debug }),
				development && livereload({ delay: 300 }),

				// Génère un rapport de visualisation uniquement quand ANALYZE=true
				await getVisualizerPlugin(),
			],
		},
		// Configuration de la compilation en ESM au lieu de IIFE (pour avoir un bundle plus léger et plus moderne) : c'est la configuration utilisée par défaut si le navigateur supporte les modules (ce qui est le cas de tous les navigateurs modernes)
		{
			input: mainJsFile,
			output: {
				dir: `${distFolder}chunks`,
				format: "esm",
				sourcemap: true,
				// En développement, on évite le mangle pour faciliter le débogage.
				minify: debug ? false : { mangle: true },
			},
			transform: {
				target: ECMA_VERSION,
			},

			// On a déjà minifié les CSS dans le bundle IIFE, donc on ne le fait pas dans le bundle ESM : on rajoute l'option cssAlreadyMinified : true
			plugins: [
				createMinifyStylesPlugin({
					...minifyStylesPluginOptions,
					cssAlreadyMinified: true,
				}),
			],
		},
		// Compilation du script de fallback qui permet de basculer sur le bundle IIFE si le navigateur ne supporte pas les modules
		{
			input: `${appFolder}js/iifeFallback.js`,
			output: {
				dir: `${distFolder}`,
				format: "iife",
				sourcemap: false,
				minify: { mangle: true },
				strict: true,
			},
		},
	];
}

export default await createBuildConfig();
