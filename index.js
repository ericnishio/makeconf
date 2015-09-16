'use strict';

const prompt = require('prompt');
const clc = require('cli-color');
const cwd = require('./lib/cwd');
const load = require('./lib/load');
const delegate = require('./lib/delegate');
const logger = require('./lib/logger');
const makeconfjson = require(cwd('makeconf.json'));

load(makeconfjson)
  .then((schema) => {
    prompt.get(schema, (err, result) => {
      if (err) {
        return;
      }

      delegate(result, makeconfjson)
        .then((savedResult) => {
          logger.success(`Saved config in ${savedResult.file}`);
        }, (e) => {
          logger.error(e);
        });
    });
  }, (err) => {
    logger.error(err);
  });
