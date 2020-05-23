'use strict';

const assert = require('assert');
const MongoQS = require('.');

const querystring = require('querystring');
const qs = require('qs'); // eslint-disable-line import/no-extraneous-dependencies

let mqs = null;
let query = null;

beforeEach(() => {
  mqs = new MongoQS({
    betweens: ['createdAt', 'updatedAt']
  });

  query = {};
});

describe('parse()', () => {
  it('test', () => {
    let filter = mqs.parse({
      foo: 'bar',
      createdAt: '2014-01-01|2014-02-01',
      updatedAt: '2014-01-01|2014-02-01',
    })
    console.log(filter)
    // assert.deepEqual(mqs.parse({
    //   foo: [],
    // }), {});
    // assert.deepEqual(mqs.parse({
    //   foo: {},
    // }), {});
    // assert.deepEqual(mqs.parse({
    //   foo: false,
    // }), {});
  });
});
