import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import pluginJs from "@eslint/js";
import codeceptjsPlugin from "eslint-plugin-codeceptjs";

const APP_FOLDER = "app/";
const CODECEPT_GLOBALS = codeceptjsPlugin.environments.codeceptjs.globals;

export default defineConfig([
	globalIgnores([APP_FOLDER + "js/lib/**"]),
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.jasmine,
				...globals.node,
			},
			ecmaVersion: 2020,
		},
	},
	pluginJs.configs.recommended,
	{
		files: [APP_FOLDER + "**/*.js", APP_FOLDER + "**/*.mjs", "tests/**/*.*js"],
		plugins: { codeceptjs: codeceptjsPlugin },
		rules: {
			...codeceptjsPlugin.configs.recommended.rules,
			semi: ["error", "always"],
			indent: "off",
			quotes: ["error", "double", { avoidEscape: true }],
			"no-multi-spaces": ["error"],
			"no-trailing-spaces": ["error"],
			"comma-spacing": ["error"],
			"array-bracket-spacing": ["error"],
			"object-curly-spacing": ["error", "always"],
			"space-infix-ops": ["error"],
			camelcase: ["error"],
			"key-spacing": ["error"],
			"no-duplicate-imports": ["error"],
			"padded-blocks": ["error", "never"],
			"space-before-blocks": ["error"],
			"keyword-spacing": ["error"],
		},
	},
	{
		files: ["tests/e2e/**/*.js", "tests/e2e/**/*.mjs"],
		languageOptions: {
			globals: {
				...CODECEPT_GLOBALS,
				Given: false,
				When: false,
				Then: false,
			},
		},
	},
]);
