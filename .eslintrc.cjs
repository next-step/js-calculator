module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "prettier",
    "plugin:cypress/recommended",
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  plugins: ["prettier", "jest", "@babel"],
  parser: "@babel/eslint-parser",
  rules: {
    "prettier/prettier": "error",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "no-alert": "off",
    "class-methods-use-this": "off",
    "max-classes-per-file": "off",
  },
  ignorePatterns: ["*.config.js", "*.test.js", "cypress/**", ".eslintrc.cjs"],
};
