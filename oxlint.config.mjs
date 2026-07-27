import codeceptjs from "eslint-plugin-codeceptjs";
import e18e from "@e18e/eslint-plugin";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";

const ERRORS_ONLY = process.env.ERRORS_ONLY === "1";

// Gestion des variables globales
const toReadonlyGlobals = (scope) =>
	Object.fromEntries(Object.keys(scope).map((name) => [name, "readonly"]));
const BROWSER_GLOBALS = toReadonlyGlobals(globals.browser);
const NODE_GLOBALS = toReadonlyGlobals(globals.node);
const JASMINE_GLOBALS = toReadonlyGlobals(globals.jasmine);
const CODECEPT_GLOBALS = toReadonlyGlobals(
	codeceptjs.environments.codeceptjs.globals,
);
const GHERKIN_GLOBALS = {
	And: "readonly",
	But: "readonly",
	Given: "readonly",
	Then: "readonly",
	When: "readonly",
};

// Règles de base pour tous les fichiers

const baseRules = {
	"unicorn/filename-case": ["error", { case: "camelCase" }],
	"no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
	"import/no-duplicates": "error",
	"import/no-named-export": "off",
	"import/no-default-export": "off",
	"import/prefer-default-export": "off",
	"eslint/no-ternary": "off",
	"eslint/capitalized-comments": "off",
	"eslint/sort-keys": "off",
	"eslint/func-style": "off",
};

// Règles différentes selon qu'on a le mode ERRORS_ONLY ou pas
const plugins = ["typescript", "import", "unicorn"];
const jsPlugins = ERRORS_ONLY
	? []
	: [
			{ name: "e18e", specifier: "@e18e/eslint-plugin" },
			"@stylistic/eslint-plugin",
		];

const asWarn = (rules) =>
	Object.fromEntries(
		Object.entries(rules).map(([rule, config]) => {
			if (Array.isArray(config)) {
				// On extrait le premier élément du tableau des règles
				// car le premier élément est le niveau de sévérité (error, warn, off)
				// et qu'on veut le remplacer par "warn"
				const [_firstElement, ...rest] = config;
				return [rule, ["warn", ...rest]];
			}
			return [rule, config === "error" ? "warn" : config];
		}),
	);
const e18eRulesWarnOnly = asWarn(e18e.configs.recommended.rules);
const categories = ERRORS_ONLY
	? {
			correctness: "off",
			style: "off",
			pedantic: "off",
			perf: "off",
			restriction: "off",
		}
	: {
			correctness: "warn",
			style: "warn",
			pedantic: "off",
			perf: "warn",
			restriction: "warn",
		};

const appFolderOverridesRules = ERRORS_ONLY
	? { ...baseRules }
	: {
			...baseRules,
			...e18eRulesWarnOnly,
			...stylistic.configs.recommended.rules,
			"@stylistic/semi": ["error", "always"],
			"@stylistic/indent": "off",
			"@stylistic/quotes": ["error", "double", { avoidEscape: true }],
			"@stylistic/no-multi-spaces": "error",
			"@stylistic/no-trailing-spaces": "error",
			"@stylistic/comma-spacing": "error",
			"@stylistic/array-bracket-spacing": "error",
			"@stylistic/object-curly-spacing": ["error", "always"],
			"@stylistic/space-infix-ops": "error",
			"@stylistic/key-spacing": "error",
			"@stylistic/padded-blocks": ["error", "never"],
			"@stylistic/space-before-blocks": "error",
			"@stylistic/keyword-spacing": "error",
			"@stylistic/no-tabs": ["error", { allowIndentationTabs: true }],
			"@stylistic/operator-linebreak": "off",
			"@stylistic/arrow-parens": ["error", "always"],
			"@stylistic/spaced-comment": ["error", "always"],
			"@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
			"@stylistic/quote-props": "off",
			"@stylistic/indent-binary-ops": "off",
		};

const config = {
	$schema: "./node_modules/oxlint/configuration_schema.json",
	plugins,
	jsPlugins,
	categories,

	env: {
		builtin: true,
	},

	ignorePatterns: ["app/js/lib/**", "**/*.min.js", "app/js/plugins/**/*"],

	globals: BROWSER_GLOBALS,

	overrides: [
		{
			files: ["app/**/*.{js,mjs}"],
			rules: appFolderOverridesRules,
		},
		{
			files: ["tests/**/*", "./*.{js,mjs}"],
			rules: {
				...baseRules,
				"unicorn/filename-case": ["error", { case: "snakeCase" }],
				"eslint/new-cap": "off",
				"eslint/id-length": "off",
				"import/unambiguous": "off",
			},
			globals: {
				...NODE_GLOBALS,
				...JASMINE_GLOBALS,
				...CODECEPT_GLOBALS,
				...GHERKIN_GLOBALS,
			},
		},
	],

	rules: {
		...baseRules,
	},
};

// oxlint-disable-next-line import/no-default-export
export default config;
