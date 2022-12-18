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
        "react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }],
        "react/function-component-definition": ["error", {
            "namedComponents": "arrow-function",
            "unnamedComponents": "arrow-function"
        }],
        "react/forbid-component-props": "off",
        "react/require-default-props": ["error", {
            "forbidDefaultForRequired": true,
            "functions": "defaultArguments"
        }]
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};
