exports.config = {
	output: "./tests/e2e/output",
	helpers: {
		Playwright: {
			browser: "chromium",
			url: "http://localhost:8888",
			bypassCSP: true,
			show: false,
			locale: "fr-FR",
		},
	},
	include: {
		I: "./tests/e2e/.config/steps_file.js",
	},
	mocha: { bail: true },
	bootstrap: null,
	timeout: null,
	teardown: null,
	hooks: [],
	gherkin: {
		features: "./features/**/*.feature",
		steps: "./tests/e2e/step_definitions/**/*.js",
	},
	plugins: {
		screenshot: {
			enabled: true,
			on: "fail",
		},
		retryFailedStep: {
			enabled: true,
		},
		pauseOnFail: {},
	},
	stepTimeout: 0,
	stepTimeoutOverride: [
		{
			pattern: "wait.*",
			timeout: 0,
		},
		{
			pattern: "amOnPage",
			timeout: 0,
		},
	],
	name: "myApp",
};
