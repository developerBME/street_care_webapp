const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  setupNodeEvents(on, config) {
    // implement node event listeners here
  },

  e2e: {
  baseUrl: 'http://localhost:3000',
  supportFile: false
  },
});
