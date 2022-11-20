module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  extends: [
    "airbnb",
    "plugin:prettier/recommended",
    "plugin:cypress/recommended",
  ],
  rules: {
    "import/extensions": ["off"],
    "max-depth": ["error", 2],
    "lines-between-class-members": "off",
  },
};
