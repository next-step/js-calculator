module.exports = {
  env: {
    'cypress/globals': true,
  },
  plugins: ['cypress', 'chai-friendly', 'prettier'],
  extends: ['plugin:cypress/recommended', 'plugin:chai-friendly/recommended', 'plugin:prettier/recommended'],
};
