const createValidator = require('../')
const required = require('@clocklimited/validity-required')
const assert = require('assert')

describe('validity-validate-if', function() {
  it('should throw if no comparator given', function() {
    assert.throws(function() {
      createValidator()
    }, /No comparator provided/)
    assert.throws(function() {
      createValidator()
    }, /No comparator provided/)
  })

  it('should throw if no validity function passed', function() {
    assert.throws(function() {
      createValidator(f => f)
    }, /No validator provided/)

    assert.throws(function() {
      createValidator(f => f, 'not a function')
    }, /No validator provided/)
  })

  it('should call validator with property value and object', function(done) {
    var obj = { property: 'set', secondProperty: 'also set' }
    createValidator((propertyValue, object) => {
      assert.strictEqual(propertyValue, 'also set')
      assert.deepStrictEqual(obj, object)
    }, required)(
      'secondProperty',
      'Second Property',
      obj,
      {},
      function(err, message) {
        assert.equal(undefined, message)
        done()
      }
    )
  })

  it('should call validator if comparator is true', function(done) {
    var obj = { property: 'set', secondProperty: '' }
    createValidator((propertyValue, object) => {
      return true
    }, required)(
      'secondProperty',
      'Second Property',
      obj,
      {},
      function(err, message) {
        assert.equal('Second Property is required', message)
        done()
      }
    )
  })

  it('should not call validator if comparator is false', function(done) {
    var obj = { property: 'set', secondProperty: '' }
    createValidator((propertyValue, object) => {
      return false
    }, required)(
      'secondProperty',
      'Second Property',
      obj,
      {},
      function(err, message) {
        assert.equal(undefined, message)
        done()
      }
    )
  })

  it('should provide parent as an argument', function(done) {
    var obj = { property: 'set', secondProperty: '' }
    createValidator((propertyValue, object, parent) => {
        assert.equal(parent.value, true)
      return false
    }, required)(
      'secondProperty',
      'Second Property',
      obj,
      { value: true },
      function(err, message) {
        assert.equal(undefined, message)
        done()
      }
    )
  })
})
