/* eslint-disable */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:json/recommended'
	],
	globals: {
		Deno: 'readonly'
	},
	rules: {
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
	ignorePatterns: [
		'test/**/*'
	],
	"overrides": [
		{
			"files": ["tsconfig.json"],
			"rules": {
				"json/*": ["error", "allowComments"]
			}
		}
	]
};
