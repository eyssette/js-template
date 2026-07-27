const config = {
	// eslint-disable-next-line camelcase
	spec_dir: "tests/unit",
	// eslint-disable-next-line camelcase
	spec_files: ["**/*[sS]pec.?(m)js"],
	helpers: ["helpers/**/*.?(m)js"],
	env: {
		stopSpecOnExpectationFailure: false,
		random: true,
		forbidDuplicateNames: true,
	},
};

export default config;
