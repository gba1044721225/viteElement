module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'standard-with-typescript',
        'plugin:prettier/recommended'
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        'vue/no-multiple-template-root': 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'vue/multi-word-component-names': 'off',
        'no-unused-vars': 'off',
        'no-undef': 'off',
        quotes: ['error', 'single'] // 引号规则为：“双引号”，否则一律按照 “error” 处理（你也可以改成warn试一下）
    }
}
