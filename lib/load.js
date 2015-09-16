'use strict';

const _ = require('lodash');
const fs = require('fs');
const cwd = require('./cwd');
const getCompiler = require('./get-compiler');

/**
 * Turns a makeconf.json file into a prompt schema.
 * @param  {Object} makeconfjson
 * @return {Promise}
 */
module.exports = (makeconfjson) => {
  return new Promise((resolve, reject) => {
    const file = _.get(makeconfjson, 'file');
    const type = _.get(makeconfjson, 'type');
    const config = _.get(makeconfjson, 'config');

    let schema = {
      properties: {}
    };

    configExists(file)
      .then(() => {
        return loadConfig(file, type);
      }, () => {
        _.forEach(config, (item, name) => {
          schema.properties[name] = item;
        });

        return resolve(schema);
      })
      .then((configAsJson) => {
        _.forEach(config, (item, name) => {
          if (configAsJson[name]) {
            item.default = configAsJson[name];
          }

          schema.properties[name] = item;
        });

        return resolve(schema);
      }, (err) => {
        return reject(err);
      });
  });
};

/**
 * Checks if a config file already exists.
 * @param  {string} file
 * @return {Promise}
 */
function configExists(file) {
  return new Promise((resolve, reject) => {
    fs.stat(cwd(file), (err) => {
      if (err) {
        return reject();
      }

      return resolve();
    });
  });
}

/**
 * Loads an existing config.
 * @param  {string} file
 * @param  {string} type
 * @return {Promise}
 */
function loadConfig(file, type) {
  return new Promise((resolve, reject) => {
    const compiler = getCompiler(type);

    if (!compiler) {
      return reject(`No compiler found for config type: ${type}`);
    }

    compiler.parse(cwd(file))
      .then((configAsJson) => {
        return resolve(configAsJson);
      }, (err) => {
        return reject(err);
      });
  });
}
