import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import promise from "eslint-plugin-promise";
import react from "eslint-plugin-react";
import tsdoc from "eslint-plugin-tsdoc";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/.next", "**/.git", "**/node_modules", "**/public"],
}, ...fixupConfigRules(compat.extends("next/core-web-vitals", "prettier", "turbo",
      'plugin:react/recommended','eslint:recommended', 'plugin:@typescript-eslint/recommended')), {
    plugins: {
        "unused-imports": unusedImports,
        '@typescript-eslint': fixupPluginRules(typescriptEslint),
        react: fixupPluginRules(react),
        tsdoc,
        promise,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "tsdoc/syntax": "off",

        "no-restricted-imports": ["warn", {
            patterns: [{
                group: ["@mui/(?!material/styles/createTypography)\\w+/\\w+/\\w+"],
                message: "Importing from subdirectories is restricted. Use top-level exports where available.",
            }],

            paths: [{
                name: "@reduxjs/toolkit",
                message: "Please do not use Redux Toolkit, migrate to zustand.",
            }, {
                name: "react-transition-group",
                message: "Migrate to MUI or similar. This package is not well maintained.",
            }],
        }],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        curly: "error",
        "prefer-const": "error",
        "no-else-return": "error",
        "no-unneeded-ternary": "error",
        "no-alert": "error",
        "no-empty": "error",
        'no-loss-of-precision': 'off',
        'no-extra-boolean-cast': 'off',
        "no-useless-catch": "error",
        "require-await": "error",
        'no-constant-binary-expression': 'off',
        "no-continue": "error",
        "react/no-unescaped-entities": "error",
        "promise/prefer-await-to-then": "error",
        "react-hooks/exhaustive-deps": "error",
        "no-console": "error",
        'no-undef': 'off',
        "unused-imports/no-unused-imports": "error",
        "no-magic-numbers": "off",
        'react/react-in-jsx-scope': 'off',
        "react/no-direct-mutation-state": "off",
        'react/prop-types': 'off',
    },
}];