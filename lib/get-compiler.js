'use strict';

const _ = require('lodash');

/**
 * Returns a compiler by type.
 * @param  {string} type
 * @return {Object}
 */
module.exports = (type) => {
  const compilers = {
    '.env': require('./compilers/env')
  };

  return _.get(compilers, type, null);
};
