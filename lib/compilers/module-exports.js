'use strict';

const _ = require('lodash');

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
      let json = {};

      _.forEach(config, (value, key) => {
        value = convertValue(value);
        _.set(json, key, value);
      });

      json = JSON.stringify(json, null, 2);

      const configAsString = `module.exports = ${json};\n`;

      return resolve(configAsString);
    });
  }
};

/**
 * Attempts to convert a string value to a relevat type.
 * @param  {string} value
 * @return {*}
 */
function convertValue(value) {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else if (value === 'null') {
    return null;
  } else if (!isNaN(value)) {
    return Number(value);
  } else {
    return value;
  }
}
