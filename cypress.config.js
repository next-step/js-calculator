const { defineConfig } = require('cypress');

module.exports = defineConfig({
  config: {
    BASE_URL: 'http://localhost:5500/',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
