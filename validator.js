module.exports = function validateIf(comparator, validateFn) {
  if (!comparator || typeof comparator !== 'function') {
    throw new Error('No comparator provided')
  }
  if (!validateFn || typeof validateFn !== 'function') {
    throw new Error('No validator provided')
  }
  return function validate(key, keyDisplayName, object, cb) {
    if (comparator(object[key], object)) {
      return validateFn(key, keyDisplayName, object, cb)
    }

    return cb(null, undefined)
  }
}
