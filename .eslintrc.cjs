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
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier", "jest"],
  rules: {
    "prettier/prettier": "error",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "no-alert": "off",
  },
  ignorePatterns: ["*.config.js", "*.test.js", "cypress/**", ".eslintrc.cjs"],
};
