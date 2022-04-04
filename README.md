# validity-validate-if
Conditional validity validator

## Installation

```
yarn add @clocklimited/validity-validate-if
```

## Usage

Below is an example usage with schemata:

```javascript
const schemata = require('schemata')
const validateIf = require('@clocklimited/validity-validate-if')
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
const validateIf = require('@clocklimited/validity-validate-if')
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

If you are performing validation within a subschema, the parent object is provided in the third argument to the comparator:


```javascript
const schemata = require('schemata')
const validateIf = require('@clocklimited/validity-validate-if')
const anotherValidator = require('validity-validate-something-else')

const comparator = (property, obj, parent) => property.length !== 42 && parent.source === 'GitHub'

const childSchema = schemata({
  name: 'SchemaChild',
  properties: {
    property: {
      type: String,
      validators: { all: [ validateIf(comparator, required) ] }
    }
  }
})

const schema = schemata({
  name: 'SchemaParent',
  properties: {
    children: {
      type: childSchema
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
