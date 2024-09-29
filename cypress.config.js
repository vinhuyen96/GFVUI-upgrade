const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://cypressdev.stratawise.com/',
    testIsolation: true,
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    viewportWidth: 1366, // the most suitable screen for the desktop website
    viewportHeight: 768, // the most suitable screen for the desktop website
    requestTimeout: 20000,
    numTestsKeptInMemory: 1,
    responseTimeout: 30000,
    pageLoadTimeout: 100000,
    experimentalRunAllSpecs: true,
    retries: {
      // Configure retry attempts for `cypress run`
      runMode: 2,
      // Configure retry attempts for `cypress open`
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);

          return null;
        },
      });
      // implement node event listeners here
    },
  },
});
