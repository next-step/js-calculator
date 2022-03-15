/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  // https://github.com/bahmutov/cypress-watch-and-reload
  // eslint-disable-next-line global-require
  require('cypress-watch-and-reload/plugins')(config);
  // IMPORTANT: return the config object
  // because the plugin might have changed it
  return config;
};
