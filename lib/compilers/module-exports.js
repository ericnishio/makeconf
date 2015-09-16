'use strict';

const Handlebars = require('handlebars');
const source = `module.exports = {
{{#each config}}
  {{#if @last}}
  {{@key}}: "{{this}}"
  {{else}}
  {{@key}}: "{{this}}",
  {{/if}}
{{/each}}
};
`;

module.exports = {
  /**
   * Parses a file and returns it as JSON.
   * @param  {string} file
   * @return {Promise}
   */
  parse(file) {
    return new Promise((resolve, reject) => {
      const configAsJson = require(file);

      if (configAsJson) {
        return resolve(configAsJson);
      }

      return reject(`Failed to parse file: ${file}`);
    });
  },

  /**
   * Compiles a config.
   * @param  {Object} config
   * @return {Promise}
   */
  compile(config) {
    return new Promise((resolve, reject) => {
      const template = Handlebars.compile(source);
      const configAsString = template({config});
      return resolve(configAsString);
    });
  }
};
