const Router = require('express').Router()

module.exports = (server) => {
  // Base de rotas
  server.use('/api', Router)

  // Rotas de BillingCycle
  const BillingCycle = require('../api/bilingCycle/services')
  BillingCycle.register(Router, '/billingCycles')
}
