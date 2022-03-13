module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: ['airbnb', 'prettier'],
	rules: {
		'linebreak-style': 0,
		'import/prefer-default-export': 'off',
		'import/extensions': ['off'],
	},
};
