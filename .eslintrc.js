module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'html',
  ],
  rules: {
    indent: ['error', 2],
    'object-curly-newline': [
      'error', {
        ObjectExpression: 'always',
        ObjectPattern: {
          multiline: true,
        },
        ImportDeclaration: 'never',
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ],
    'array-element-newline': ['error', {
      ArrayExpression: 'consistent',
      ArrayPattern: {
        minItems: 3,
      },
    }],
  },
};
