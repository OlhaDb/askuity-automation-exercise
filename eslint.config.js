import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as wdio from 'eslint-plugin-wdio';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['node_modules', 'dist', 'build', 'allure-results', 'allure-report'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      wdio,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      'no-console': 'warn',
    },
  },
];
