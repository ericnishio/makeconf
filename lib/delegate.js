'use strict';

const _ = require('lodash');
const getCompiler = require('./get-compiler');
const write = require('./write')

/**
 * Delegates a config to a compiler, and saves the file.
 * @param  {Object} config
 * @param  {string} type
 * @param  {string} file
 * @return {Promise}
 */
module.exports = (config, makeconfjson) => {
  return new Promise((resolve, reject) => {
    const type = _.get(makeconfjson, 'type');
    const file = _.get(makeconfjson, 'file');
    const compiler = getCompiler(type);

    if (!compiler) {
      return reject(`No compiler found for config type: ${type}`);
    }

    compiler.compile(config, file)
      .then((configAsString) => {
        write(configAsString, file)
          .then((savedConfig) => {
            return resolve(savedConfig);
          }, (err) => {
            return reject();
          });
      }, (err) => {
        return reject(err);
      });
  });
};
