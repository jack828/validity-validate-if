# validity-validate-if
Conditional validity validator

## Installation

```
yarn add validity-validate-if
```

## Usage

Below is an example usage with schemata:

```javascript
const schemata = require('schemata')
const validateIf = require('validity-validate-if')
const anotherValidator = require('validity-validate-something-else')

const comparator = property => property.length !== 42

const schema = schemata({
  name: 'Schema',
  properties: {
    property: {
      type: String,
      validators: { all: [ validateIf(comparator, required) ] }
    }
  }
})
```

Optionally, if you need to validate against another property in the schema, the whole object is given as a second argument to your comparator:


```javascript
const schemata = require('schemata')
const validateIf = require('validity-validate-if')
const anotherValidator = require('validity-validate-something-else')

const comparator = (property, obj) => property.length !== 42 && obj.source === 'GitHub'

const schema = schemata({
  name: 'Schema',
  properties: {
    property: {
      type: String,
      validators: { all: [ validateIf(comparator, required) ] }
    },
    source: {
      type: String
    }
  }
})
```

## Credits

[Jack Burgess](https://github.com/jack828)

## License

MIT
