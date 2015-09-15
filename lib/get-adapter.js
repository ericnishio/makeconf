'use strict';

const _ = require('lodash');

/**
 * Returns a config adapter.
 * @param  {string} type
 * @return {Object}
 */
module.exports = (type) => {
  const adapters = {
    '.env': require('./adapters/env')
  };

  return _.get(adapters, type, null);
};
