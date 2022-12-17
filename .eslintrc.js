module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'react-native/react-native': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-native/all',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/jsx-runtime'
    ],
    'overrides': [
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'plugins': [
        'react',
        'react-native',
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    },
    'settings': {
        'react': {
            'version': 'detect'
        }
    }
};
