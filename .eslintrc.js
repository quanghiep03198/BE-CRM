module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js', 'ecosystem.config.js', 'commitlint.config.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'prettier/prettier': [
			'warn',
			{
				singleQuote: true,
				trailingComma: 'none',
				useTabs: true,
				tabWidth: 3,
				semi: false,
				printWidth: 120,
				endOfLine: 'auto',
				plugins: ['prettier-plugin-organize-imports']
			}
		]
	}
}
