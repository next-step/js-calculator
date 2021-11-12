// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
  },
  env: {
    es2021: true,
    browser: true,
  },
  globals: {
    OPERATOR: true,
  },
};
