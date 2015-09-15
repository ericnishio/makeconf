'use strict';

const prompt = require('prompt');
const clc = require('cli-color');
const cwd = require('./lib/cwd');
const load = require('./lib/load');
const save = require('./lib/save');
const logger = require('./lib/logger');
const makeconfjson = require(cwd('makeconf.json'));

load(makeconfjson)
  .then((schema) => {
    prompt.get(schema, (err, result) => {
      if (err) {
        return;
      }

      save(result, makeconfjson)
        .then((savedResult) => {
          logger.success(`Config saved in ${savedResult.file}`);
        }, (e) => {
          logger.error(e);
        });
    });
  }, (err) => {
    logger.error(err);
  });
