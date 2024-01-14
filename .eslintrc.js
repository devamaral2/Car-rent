module.exports = {
    extends: ['airbnb', 'airbnb-typescript', 'prettier'],
    parserOptions: {
        babelOptions: {
            presets: [require.resolve('next/babel')],
        },
        sourceType: 'module',
        ecmaVersion: 'latest',
    },
    plugins: [
        'prettier',
        '@typescript-eslint',
        'no-relative-import-paths',
        'import',
    ],
    parser: '@typescript-eslint/parser',
    env: {
        jest: true,
        node: true,
        es2021: true,
        browser: true,
    },
    rules: {
        '@typescript-eslint/consistent-type-definitions': 'warn',
        '@typescript-eslint/dot-notation': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/lines-between-class-members': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 'warn',
        'import/no-cycle': 'warn',
        'no-underscore-dangle': 'warn',
        'no-param-reassign': 'warn',
        'consistent-return': 'warn',
        'linebreak-style': 0,
        'no-console': [
            'error',
            { allow: ['info', 'error', 'time', 'timeEnd'] },
        ],
        'class-methods-use-this': 'off',
        // 'no-relative-import-paths/no-relative-import-paths': [
        //     'warn',
        //     { allowSameFolder: true },
        // ],
    },
};
