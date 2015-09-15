'use strict';

const fs = require('fs');
const _ = require('lodash');
const envfile = require('envfile');
const cwd = require('../cwd');

module.exports = {
  /**
   * Parses a .env file and returns it as JSON.
   * @param  {string} file
   * @return {Promise}
   */
  read(file) {
    return new Promise((resolve, reject) => {
      const configAsJson = envfile.parseFileSync(file);

      if (configAsJson) {
        resolve(configAsJson);
      } else {
        reject('Config file not found.');
      }
    });
  },

  /**
   * Writes the config in a .env file.
   * @param  {Object} config
   * @param  {string} file
   * @return {Promise}
   */
  write(config, file) {
    return new Promise((resolve, reject) => {
      file = file || '.env';

      let configAsString = '';

      _.forEach(config, (choice, name) => {
        if (choice) {
          configAsString += `${name}=${choice}\n`;
        }
      });

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
  }
};
