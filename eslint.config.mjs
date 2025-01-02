import { defineConfig } from 'eslint-define-config';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginJest from 'eslint-plugin-jest';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: {
			globals: {
				browser: true,
			},
		},
		plugins: {
			react: pluginReact,
			prettier: pluginPrettier,
			import: pluginImport,
		},
		rules: {
			'prettier/prettier': ['error'],
		},
		settings: {
			react: {
				version: 'detect',
			},
			'import/resolver': {
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
				typescript: {
					project: './tsconfig.json',
				},
			},
		},
	},
	{
		files: ['**/dist/**/*'],
		ignores: ['dist/'],
	},
	{
		files: ['tests/**/*'],
		plugins: {
			jest: pluginJest,
		},
		env: {
			'jest/globals': true,
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		rules: {
			'prettier/prettier': ['error'],
			'react/react-in-jsx-scope': 'off',
		},
	},
]);
