'use strict';

const _ = require('lodash');
const getAdapter = require('./get-adapter');

/**
 * Saves a config file.
 * @param  {Object} config
 * @param  {string} type
 * @param  {string} file
 * @return {Promise}
 */
module.exports = (config, makeconfjson) => {
  return new Promise((resolve, reject) => {
    const type = _.get(makeconfjson, 'type');
    const file = _.get(makeconfjson, 'file');
    const adapter = getAdapter(type);

    if (!adapter) {
      return reject(`No adapter found for config type: ${type}`);
    }

    adapter.write(config, file)
      .then((result) => {
        return resolve(result);
      }, (err) => {
        return reject(err);
      });
  });
};
