const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://smchoxx.github.io/js-calculator/',
  },
});
