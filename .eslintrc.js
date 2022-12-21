module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "react-native/react-native": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/all",
        "plugin:react-native/all",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/jsx-runtime"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react",
        "react-native",
        "@typescript-eslint"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "eol-last": [
            "error"
        ],
        "max-len": [
            "error",
            120
        ],
        "react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }],
        "react/function-component-definition": ["error", {
            "namedComponents": "arrow-function",
            "unnamedComponents": "arrow-function"
        }],
        "react/forbid-component-props": "off",
        "react/require-default-props": ["error", {
            "forbidDefaultForRequired": true,
            "functions": "defaultArguments"
        }],
        "react/jsx-max-props-per-line": ["error", { "maximum": { "single": 3, "multi": 1 } }],
        "react/jsx-newline": ["error", { "prevent": true, "allowMultilines": true }],
        "react/jsx-handler-names": "off"
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};
