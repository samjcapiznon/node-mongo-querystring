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
      bar: true,
      foo: true,
      bar: true
    }
  });
  query = {};
});

describe('parse()', () => {
  describe('$in / $nin operator', () => {
    it('returns in array query', () => {
      const string = 'foo[]=10&foo[]=11';
      const params = querystring.parse(string);

      assert.deepEqual(mqs.parse(params), {
        foo: {
          $in: [10, 11],
        },
      });
    });

    it('returns in array query with "qs" parser (GH-06)', () => {
      const string = 'foo[]=10&foo[]=10.011&foo[]=bar&foo[]=true';
      const params = qs.parse(string);

      assert.deepEqual(mqs.parse(params), {
        foo: {
          $in: [10, 10.011, 'bar', true],
        },
      });
    });

    it('returns in array with any not in array query', () => {
      const string = 'foo[]=10&foo[]=!10.011&foo[]=!bar&foo[]=baz';
      const params = querystring.parse(string);

      assert.deepEqual(mqs.parse(params), {
        foo: {
          $in: [10, 'baz'],
          $nin: [10.011, 'bar'],
        },
      });
    });

    it('returns not in array query', () => {
      const string = 'foo[]=!10&foo[]=!10.011&foo[]=!bar&foo[]=!false';
      const params = querystring.parse(string);

      assert.deepEqual(mqs.parse(params), {
        foo: {
          $nin: [10, 10.011, 'bar', false],
        },
      });
    });

    it('returns not in array query with "gs" parser (GH-06)', () => {
      const string = 'foo[]=!10&foo[]=!10.011&foo[]=!bar&foo[]=!false';
      const params = qs.parse(string);

      assert.deepEqual(mqs.parse(params), {
        foo: {
          $nin: [10, 10.011, 'bar', false],
        },
      });
    });


    it('returns not in array with any in array query', () => {
      const string = 'foo[]=!10&foo[]=10.011&foo[]=bar&foo[]=!baz';
      const params = querystring.parse(string);

      assert.deepEqual(mqs.parse(params), {
        foo: {
          $nin: [10, 'baz'],
          $in: [10.011, 'bar'],
        },
      });
    });
  });
});
