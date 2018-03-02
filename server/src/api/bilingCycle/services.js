const billingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

billingCycle.methods(['get', 'post', 'put', 'delete'])
billingCycle.updateOptions({
  new: true,
  runValidators: true
})
billingCycle.after('post', errorHandler)
.after('put', errorHandler)

billingCycle.route('count', (req, res, next) => {
  billingCycle.count((err, result) => {
    if (err) {
      res.status(500).send({ errors: [err] })
    } else {
      res.status(200).send({ value: result })
    }
  })
})

billingCycle.route('summary', (req, res, next) => {
  billingCycle.aggregate({
    $project: {
      credit: {
        $sum: '$credits.value'
      },
      debt: {
        $sum: '$debts.value'
      }
    }
  }, {
    $group: {
      _id: null,
      $credit: {
        $sum: '$credit'
      },
      $debit: {
        $sum: '$debit'
      }
    }
  }, {
    $project: {
      _id: 0,
      credit: 1,
      debt: 1
    }
  }, (err, result) => {
    if (err) {
      res.status(500).send({ errors: [err] })
    } else {
      res.status(200).send(result[0] || { credit: 0, debt: 0 })
    }
  })
})

module.exports = billingCycle
