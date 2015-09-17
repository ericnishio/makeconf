'use strict';

const _ = require('lodash');
const handlebars = require('handlebars');

handlebars.registerHelper('isString', function(value, options) {
  return isNaN(value) && !_.includes(['true', 'false', 'null'], value) ? options.fn(this) : options.inverse(this);
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
    {{#isString this}}
  {{@key}}: '{{this}}',
    {{else}}
  {{@key}}: {{this}},
    {{/isString}}
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
      const template = handlebars.compile(source);
      const configAsString = template({config});

      return resolve(configAsString);
    });
  }
};
