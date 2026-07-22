import terser from "@rollup/plugin-terser";
// À décommenter si on veut importer des fichiers texte (comme les fichiers Markdown) en tant que chaînes de caractères dans le code JavaScript
// import { string } from "rollup-plugin-string";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import clean from "postcss-clean";
import del from "rollup-plugin-delete";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const ECMA_VERSION = 2018;
const appFolder = "app/";
const distFolder = "dist/";

// On supprime certains messages d'erreurs qu'affiche Rollup et qui ne sont pas très utiles
const onwarn = (warning) => {
	if (warning.code === "THIS_IS_UNDEFINED") {
		// On désactive ce message d'erreur affiché à cause de certains modules
		return;
	}
	console.warn(`(!) ${warning.message}`);
};

const development =
	process.env.NODE_ENV && process.env.NODE_ENV === "development";

// En mode DEBUG, on ne change pas le nom des variables, afin de pouvoir les vérifier, sinon on les minifie pour réduire la taille du fichier final
const optionsTerser =
	// eslint-disable-next-line no-undef
	process.env.DEBUG == "true"
		? { mangle: false, ecma: ECMA_VERSION }
		: { ecma: ECMA_VERSION };

// Configuration de la compilation avec Rollup
export default {
	input: appFolder + "js/main.mjs",
	onwarn,
	output: {
		file: distFolder + "script.min.js",
		format: "iife",
		plugins: [terser(optionsTerser)],
		sourcemap: true,
	},
	plugins: [
		// Importe des fichiers texte (comme les fichiers Markdown) en tant que chaînes de caractères dans le code JavaScript
		// string({
		// 	include: appFolder + "*.md",
		// }),

		// Supprime le contenu du dossier dist avant de compiler
		del({ targets: "dist" }),

		// Résout les modules Node.js
		resolve(),

		// Convertit les modules CommonJS en modules ES6 pour qu'ils puissent être utilisés par Rollup
		commonjs(),

		// Compile et minifie le CSS
		postcss({
			extensions: [".css"],
			extract: "css/styles.min.css",
			minimize: true,
			plugins: [
				clean({
					level: {
						2: {
							all: true,
						},
					},
				}),
			],
		}),

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

		// En mode développement, lance un serveur de développement et recharge la page automatiquement lorsqu'un fichier est modifié
		development &&
			serve({ historyApiFallback: true, contentBase: ["dist", "./"] }),
		development && livereload(),
	],
};
