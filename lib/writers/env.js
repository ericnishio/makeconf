'use strict';

const fs = require('fs');
const _ = require('lodash');
const cwd = require('../cwd');

/**
 * Stores a config as an .env file.
 * @param  {Object} config
 * @param  {string} file
 * @return {Promise}
 */
module.exports = (config, file) => {
  file = file || '.env';

  let configAsString = '';

  _.forEach(config, (choice, name) => {
    if (choice) {
      configAsString += `${name}=${choice}\n`;
    }
  });

  return new Promise((resolve, reject) => {
    fs.writeFile(cwd(file), configAsString, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          file: file,
          contents: configAsString
        });
      }
    });
  });
};
