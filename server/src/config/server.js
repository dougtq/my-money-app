const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const queryInt = require('express-query-int')

const allowCors = require('./cors')

const server = express()
server.set('port', process.env.PORT || 3000)

server.use(allowCors)
server.use(compression())
server.use(helmet({ hidePoweredBy: true }))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(queryInt())

server.listen(server.get('port'), () => {
  console.info(`Express server running on port: ${server.get('port')}.`)
})

module.exports = server
