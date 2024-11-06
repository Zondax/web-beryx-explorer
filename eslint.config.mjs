import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    )
  ),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    ignores: ['**/.next/**', '**/dist/**', '.github', 'node_modules', 'public', '.ladle'],
  },
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      react: fixupPluginRules(react),
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 1,
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-loss-of-precision': 'off',
      '@next/next/no-img-element': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-extra-boolean-cast': 'off',
      'no-constant-binary-expression': 'off',
      'no-prototype-builtins': 'off',
      'no-redeclare': 'off',
      'no-undef': 'off',

      'require-yield': 'off',
      'no-empty': 'off',
      'no-control-regex': 'off',
      'no-useless-escape': 'off',
      'no-cond-assign': 'off',
      'no-fallthrough': 'off',
      'no-func-assign': 'off',
      'getter-return': 'off',
      'no-self-assign': 'off',
      'no-case-declarations': 'off',
      'no-useless-catch': 'off',
      'no-unreachable': 'off',
      'no-unsafe-finally': 'off',
      'no-misleading-character-class': 'off',
      'react/no-find-dom-node': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      'no-unused-private-class-members': 'off',
      'no-sparse-arrays': 'off',
      'valid-typeof': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-dupe-class-members': 'off',
      'no-setter-return': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'no-dupe-else-if': 'off',
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js?', '.jsx', '.ts', '.tsx'],
        },
      ],
    },
  },
]
