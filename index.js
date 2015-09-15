'use strict';

const prompt = require('prompt');
const clc = require('cli-color');
const cwd = require('./lib/cwd');
const loadSchema = require('./lib/schema');
const save = require('./lib/save');

const makeconfjson = require(cwd('makeconf.json'));

loadSchema(makeconfjson)
  .then((schema) => {
    prompt.get(schema, (err, result) => {
      if (err) {
        return;
      }

      save(result, makeconfjson.type, makeconfjson.file)
        .then((savedResult) => {
          console.log(clc.green(`\n[makeconf] Config saved in ${savedResult.file}\n`));
          console.log(savedResult.contents);
        }, (e) => {
          console.error(clc.red(`[makeconf] ${e}`));
        });
    });
  });
