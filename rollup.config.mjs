import terser from "@rollup/plugin-terser";
// import { string } from "rollup-plugin-string";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import clean from "postcss-clean";

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
		// string({
		// 	include: appFolder + "*.md",
		// }),
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
		copy({
			targets: [
				{
					src: [appFolder + "**/*"],
					dest: distFolder,
				},
			],
			flatten: false,
		}),
	],
};
