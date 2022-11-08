module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended', 'plugin:cypress/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 'off',
    'max-depth': ['error', 2],
    'no-alert': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
