'use strict';

const _ = require('lodash');

/**
 * Returns a compiler by format.
 * @param  {string} format
 * @return {Object}
 */
module.exports = (format) => {
  const compilers = {
    '.env': require('./compilers/env'),
    'json': require('./compilers/json'),
    'module.exports': require('./compilers/module-exports')
  };

  return _.get(compilers, format, null);
};
