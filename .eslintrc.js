module.exports = {
	"extends": [
		"yoast-base",
	],
	rules: {
		"require-jsdoc": 0, // Docs.. maybe later.
		"no-inline-comments": 0, // Comments are king.
		"no-console": 0, // Output is the way here.
		complexity: 0, // For this project, I really don't care :D
		"no-constant-condition": [ "error", { checkLoops: false } ], // I just love my while( true ) loops.
	},
};
