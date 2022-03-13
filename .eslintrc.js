module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@babel/eslint-parser',
  extends: ['plugin:cypress/recommended', 'airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'no-new': 0,
  },
};
