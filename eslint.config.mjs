import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import pluginJs from "@eslint/js";
import codeceptjsPlugin from "eslint-plugin-codeceptjs";
import unicorn from "eslint-plugin-unicorn";
import stylistic from "@stylistic/eslint-plugin";

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
		plugins: { codeceptjs: codeceptjsPlugin, unicorn, "@stylistic": stylistic },
		extends: ["unicorn/recommended"],
		rules: {
			...codeceptjsPlugin.configs.recommended.rules,
			camelcase: ["error"],
			"no-duplicate-imports": ["error"],
			"@stylistic/semi": ["error", "always"],
			"@stylistic/indent": ["off"],
			"@stylistic/quotes": ["error", "double", { avoidEscape: true }],
			"@stylistic/no-multi-spaces": ["error"],
			"@stylistic/no-trailing-spaces": ["error"],
			"@stylistic/comma-spacing": ["error"],
			"@stylistic/array-bracket-spacing": ["error"],
			"@stylistic/object-curly-spacing": ["error", "always"],
			"@stylistic/space-infix-ops": ["error"],
			"@stylistic/key-spacing": ["error"],
			"@stylistic/padded-blocks": ["error", "never"],
			"@stylistic/space-before-blocks": ["error"],
			"@stylistic/keyword-spacing": ["error"],
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
