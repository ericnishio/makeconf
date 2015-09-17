'use strict';

const _ = require('lodash');
const Handlebars = require('handlebars');

Handlebars.registerHelper('isString', function(value, options) {
  if (isNaN(value) && !_.includes(['true', 'false', 'null'], value)) {
    return options.fn(this);
  }

  return options.inverse(this);
});

const source = `module.exports = {
{{#each config}}
  {{#if @last}}
  {{#isString this}}
  {{@key}}: '{{this}}'
  {{else}}
  {{@key}}: {{this}}
  {{/isString}}
  {{else}}
  {{@key}}: {{this}},
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
    return new Promise((resolve) => {
      const template = Handlebars.compile(source);
      const configAsString = template({config});
      return resolve(configAsString);
    });
  }
};
