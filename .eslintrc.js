module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-strongly-recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.js', '.jsx', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: 'packages/*/tsconfig.json',
            },
        },
    },
    plugins: ['import', 'vue', '@typescript-eslint'],
    rules: {
        camelcase: [
            0,
            {
                properties: 'never',
            },
        ],
        'no-unused-expressions': [2, { allowShortCircuit: true }],
        'no-plusplus': 0,
        'no-bitwise': 0,
        '@typescript-eslint/no-var-requires': 0,
        'func-names': ['error', 'never'],
        '@typescript-eslint/no-explicit-any': ['off'],
        // 'no-unused-vars': 'off',
        'symbol-description': 'off',
        // '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-console': 'error', // 生产环境禁用consele
        'no-debugger': 'error', // 生产环境禁用debugger,
        'linebreak-style': 0,
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        'import/no-unresolved': 'error',
        'vue/no-multiple-template-root': 0,
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error', { ignoreTypeValueShadow: true }],
        'import/prefer-default-export': 'off',
        'prettier/prettier': [
            'error',
            {
                useTabs: false,
                printWidth: 100,
                singleQuote: true,
                trailingComma: 'es5',
                bracketSpacing: true,
                arrowParens: 'avoid',
                semi: true,
                vueIndentScriptAndStyle: false,
            },
        ],
        'no-param-reassign': [
            'error',
            {
                props: false,
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                mjs: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'vue/v-on-event-hyphenation': [
            'error',
            'always',
            {
                autofix: true,
                ignore: [],
            },
        ],
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
        },
        {
            files: ['**/src/**/*.vue'],
            rules: {
                'constructor-super': 'off',
                'getter-return': 'off',
                'no-const-assign': 'off',
                'no-dupe-args': 'off',
                'no-dupe-class-members': 'off',
                'no-dupe-keys': 'off',
                'no-func-assign': 'off',
                'no-import-assign': 'off',
                'no-new-symbol': 'off',
                'no-obj-calls': 'off',
                'no-redeclare': 'off',
                'no-setter-return': 'off',
                'no-this-before-super': 'off',
                'no-undef': 'off',
                'no-unreachable': 'off',
                'no-unsafe-negation': 'off',
                'no-var': 'error',
                'prefer-const': 'error',
                'prefer-rest-params': 'error',
                'prefer-spread': 'error',
                'valid-typeof': 'off', // ts(2367)
            },
        },
    ],
};
