'use strict';

const assert = require('assert');
const MongoQS = require('.');

const querystring = require('querystring');
const qs = require('qs'); // eslint-disable-line import/no-extraneous-dependencies

let mqs = null;
let query = null;

beforeEach(() => {
  mqs = new MongoQS({
    whitelist: {
      foo: true,
      bar: true
    }
  });
  query = {};
});

describe('parse()', () => {
  describe('parsing', () => {
    
    describe('no operator', () => {

      it('return string boolean as boolean', () => {
        query = mqs.parse({
          foo: true,
          bar: false,
        });

        console.log(query)
        assert.deepEqual(query, {
          foo: true,
          bar: false,
        });
      });
    });

  })
});
