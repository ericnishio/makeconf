'use strict';

const _ = require('lodash');

/**
 * Saves a config file.
 * @param  {Object} config
 * @param  {string} type
 * @param  {string} file
 * @return {Promise}
 */
module.exports = (config, type, file) => {
  const typeToWriterMap = {
    '.env': require('./writers/env')
  };

  return new Promise((resolve, reject) => {
    let writer = _.get(typeToWriterMap, type, null);

    if (!writer) {
      reject(`Invalid config type: ${type}`);
    } else {
      writer(config, file)
        .then((result) => {
          resolve(result);
        }, (err) => {
          reject(err);
        });
    }
  });
};
