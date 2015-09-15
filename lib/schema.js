'use strict';

const _ = require('lodash');
const fs = require('fs');
const cwd = require('./cwd');

/**
 * Turns a makeconf.json file into a prompt schema.
 * @param  {Object} makeconfjson
 * @return {Promise}
 */
module.exports = (makeconfjson) => {
  return new Promise((resolve, reject) => {
    let schema = {
      properties: {}
    };

    configFileExists(makeconfjson.file)
      .then(() => {
        loadExistingConfig(makeconfjson.file, makeconfjson.type)
          .then((configAsJson) => {
            _.forEach(makeconfjson.config, (item, name) => {
              if (configAsJson[name]) {
                item.default = configAsJson[name];
              }

              schema.properties[name] = item;
            });

            resolve(schema);
          }, (err) => {
            reject(err);
          });
      }, () => {
        _.forEach(makeconfjson.config, (item, name) => {
          schema.properties[name] = item;
        });

        resolve(schema);
      });
  });
};

/**
 * Checks if a config file already exists.
 * @param  {string} file
 * @return {Promise}
 */
function configFileExists(file) {
  return new Promise((resolve, reject) => {
    fs.stat(cwd(file), (err) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

/**
 * Loads an existing config.
 * @param  {string} file
 * @param  {string} type
 * @return {Promise}
 */
function loadExistingConfig(file, type) {
  return new Promise((resolve, reject) => {
    const typeToReaderMap = {
      '.env': require('./readers/env')
    };

    const read = _.get(typeToReaderMap, type, null);

    if (read) {
      read(cwd(file))
        .then((configAsJson) => {
          resolve(configAsJson);
        }, (err) => {
          reject(err);
        });
    } else {
      reject(`Reader not found for type: ${type}`);
    }
  });
}
