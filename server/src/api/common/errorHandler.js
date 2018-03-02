const _ = require('lodash')

const error = (req, res, next) => {
  const bundles = res.locals.bundles
  if (bundles.errors) {
    const errors = parseErrors(bundles.errors)
    res.status(500).send({ errors })
  } else {
    next()
  }
}

const parseErrors = (errors) => {
  const errorCollection = []
  _.forIn(errors, err => errorCollection.push(err.message))

  return errorCollection
}

module.exports = error
