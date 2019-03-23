/**
 * Tests validation methods
 */
const should = require('should');
const target = require('../src/tesClient/utils/errors');
const { validateArguments, validatePresenceOf } = target;

describe('Validations', () => {
  describe('.validateArguments', () => {
    context('default behavior', () => {
      it('numbers, string, objects, arrays', () => {
        (function() {
          validateArguments(Math.random(Math.max), 'string', {}, []);
        }.should.not.throw());
      });

      it('undefined, string, objects', () => {
        (function() {
          validateArguments(undefined, 'string', {});
        }.should.throw());
      });
    });
  });

  describe('.validatePresenceOf', () => {
    context('default behavior', () => {
      it('numbers', () => {
        (function() {
          validatePresenceOf(Math.random(Math.max));
        }.should.not.throw());
      });

      it('undefined, string, objects', () => {
        (function() {
          validatePresenceOf(undefined);
        }.should.throw());
      });
    });
  });
});