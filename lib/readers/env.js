'use strict';

const envfile = require('envfile');

/**
 * Converts a .env file to JSON.
 * @param  {string} file
 * @return {Promise}
 */
module.exports = (file) => {
  return new Promise((resolve, reject) => {
    const configAsJson = envfile.parseFileSync(file);

    if (configAsJson) {
      resolve(configAsJson);
    } else {
      reject('Config file not found.');
    }
  });
};
