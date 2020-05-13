'use strict';

const assert = require('assert');
const MongoQS = require('.');

const querystring = require('querystring');
const qs = require('qs'); // eslint-disable-line import/no-extraneous-dependencies

let mqs = null;
let query = null;

beforeEach(() => {
  mqs = new MongoQS();
  query = {};
});

describe('parse()', () => {
  it('discards non-string values', () => {
    assert.deepEqual(mqs.parse({
      foo: [],
    }), {});
    assert.deepEqual(mqs.parse({
      foo: {},
    }), {});
    // assert.deepEqual(mqs.parse({
    //   foo: false,
    // }), {});
  });
});
