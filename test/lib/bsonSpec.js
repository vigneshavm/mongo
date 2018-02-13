'use strict';

var expect = require('chai').expect;
var mongodb = require('mongodb');

var bson = require('../../lib/bson');

describe('BSON', function () {
  describe('toBSON', function () {
    it('should convert documents with native JS types', function () {
      var test = '{test: true, "s": "hello", i: -99.44}';
      var result = bson.toBSON(test);

      expect(result).to.eql({
        test: true,
        s: 'hello',
        i: -99.44,
      });
    });

    it('should convert ObjectID to BSON', function () {
      var test = '{_id: ObjectID(), id2: ObjectId()}';
      var result = bson.toBSON(test);

      expect(result).to.have.property('_id').to.be.an.instanceof(mongodb.ObjectID);
      expect(result).to.have.property('id2').to.be.an.instanceof(mongodb.ObjectID);
    });

    it('should convert ISODate to BSON', function () {
      var test = '{date: ISODate(), date2: new Date()}';
      var result = bson.toBSON(test);

      expect(result).to.have.property('date').to.be.an.instanceof(Date);
      expect(result).to.have.property('date2').to.be.an.instanceof(Date);
    });

    it('should convert Timestamp to BSON', function () {
      var test = '{ts: Timestamp()}';
      var result = bson.toBSON(test);

      expect(result).to.have.property('ts').to.be.an.instanceof(mongodb.Timestamp);
    });

    it('should convert DBRef to BSON', function () {
      // eslint-disable-next-line max-len
      var test = '{ref: DBRef("coll", "579e18580bddc20700502419"), ref2: DBRef("coll", "579e18580bddc20700502419", "db"), ref3: Dbref("coll", "579e18580bddc20700502419", "")}';
      var result = bson.toBSON(test);

      expect(result).to.have.property('ref').to.be.an.instanceof(mongodb.DBRef);
      expect(result).to.have.property('ref').to.have.property('namespace', 'coll');
      expect(result).to.have.property('ref').to.have.property('oid').to.be.an.instanceof(mongodb.ObjectID);
      expect(result).to.have.property('ref').to.have.property('oid').eql(mongodb.ObjectID('579e18580bddc20700502419'));
      expect(result).to.have.property('ref').to.have.property('db', '');

      expect(result).to.have.property('ref2').to.be.an.instanceof(mongodb.DBRef);
      expect(result).to.have.property('ref2').to.have.property('db', 'db');

      expect(result).to.have.property('ref3').to.be.an.instanceof(mongodb.DBRef);
    });

    it('should convert Symbol to BSON', function () {
      var test = '{symbol: Symbol("test")}';
      var result = bson.toBSON(test);

      expect(result).to.have.property('symbol').to.be.an.instanceof(mongodb.Symbol);
    });

    it('should convert MinKey to BSON', function () {
      var test = '{key: MinKey()}';
      var result = bson.toBSON(test);

      expect(result).to.have.property('key').to.be.an.instanceof(mongodb.MinKey);
    });

    it('should convert MaxKey to BSON', function () {
      var test = '{key: MaxKey()}';
      var result = bson.toBSON(test);

      expect(result).to.have.property('key').to.be.an.instanceof(mongodb.MaxKey);
    });

    it('should convert Code to BSON', function () {
      var test = '{code: Code(function() { x; }), code2: Code("function() { x; }")}';
      var result = bson.toBSON(test);

      expect(result).to.have.property('code').to.be.an.instanceof(mongodb.Code);
      expect(result).to.have.property('code2').to.be.an.instanceof(mongodb.Code);
    });
  });

  describe('toString', function () {
    it('should convert simple documents', function () {
      var test = {
        bool: true,
        str: 'string',
        number: -678.53,
        list: [
          1,
          2,
          3,
        ],
      };
      var result = bson.toString(test);
      var test2 = bson.toBSON(result);

      expect(test).to.eql(test2);
    });

    it('should convert ObjectID to string', function () {
      var test = {
        id: mongodb.ObjectID(),
        id2: mongodb.ObjectID('4fb1299686a989240b000001'),
      };
      var result = bson.toString(test);
      var test2 = bson.toBSON(result);

      expect(test).to.eql(test2);
    });

    it('should convert ISODate to string', function () {
      var test = {
        date: new Date(),
      };
      var result = bson.toString(test);
      var test2 = bson.toBSON(result);

      expect(test).to.eql(test2);
    });

    it('should convert Timestamp to string', function () {
      var test = {
        ts: mongodb.Timestamp(),
        ts2: mongodb.Timestamp(100, 100),
      };
      var result = bson.toString(test);
      var test2 = bson.toBSON(result);

      expect(test).to.eql(test2);
    });

    it('should convert DBRef to string', function () {
      var test = {
        ref: mongodb.DBRef('coll', mongodb.ObjectID('57b80f922128ccef64333288'), ''),
        ref2: mongodb.DBRef('coll', mongodb.ObjectID('57b80f922128ccef64333288'), 'db'),
      };
      var result = bson.toString(test);
      var test2 = bson.toBSON(result);

      expect(test).to.eql(test2);
    });

    it('should convert Symbol to string', function () {
      var test = { symbol: mongodb.Symbol('test') };
      var result = bson.toString(test);
      var test2 = bson.toBSON(result);

      expect(test).to.eql(test2);
    });

    it('should convert MinKey to string', function () {
      var test = { key: mongodb.MinKey() };
      var result = bson.toString(test);
      var test2 = bson.toBSON(result);

      expect(test).to.eql(test2);
    });

    it('should convert MaxKey to string', function () {
      var test = { key: mongodb.MaxKey() };
      var result = bson.toString(test);
      var test2 = bson.toBSON(result);

      expect(test).to.eql(test2);
    });

    it('should convert Code to string', function () {
      var test = {
        code: mongodb.Code('function() { x; }'),
      };
      var result = bson.toString(test);
      var test2 = bson.toBSON(result);

      expect(test).to.eql(test2);
    });
  });

  describe('toJsonString', function () {
    it('should convert to a valid JSON string', function () {
      const doc = {
        dateObject: new Date(Date.UTC(2017, 1, 11)),
        objectID: new mongodb.ObjectID('589f79826ea20d18e06b1c36'),
        someValue: 'someValue',
        nestedObject: {
          level1: {
            level2: 2,
          },
        },
      };
      const result = bson.toJsonString(doc);
      const expected = '{"dateObject":"2017-02-11T00:00:00.000Z","objectID":{ "$oid": "589f79826ea20d18e06b1c36" },"someValue":"someValue","nestedObject":{"level1":{"level2":2}}}'; // eslint-disable-line max-len
      expect(result).to.equal(expected);
      const parsed = JSON.parse(result);
      expect(parsed.someValue).to.equal(doc.someValue);
    });

    it('shouldn\'t convert lone parenthesis to }', function () {
      const doc = {
        someString: '))))',
      };
      const result = bson.toJsonString(doc);
      const expected = '{"someString":"))))"}';
      expect(result).to.equal(expected);
      const parsed = JSON.parse(result);
      expect(parsed.someString).to.equal(doc.someString);
    });
  });
});
