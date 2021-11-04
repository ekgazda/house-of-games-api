const express = require('express')
const app = express()
const apiRouter = require('./routers/api.router')
const {
  handleCustomErrors,
  handle500Errors,
  handlePsqlErrors,
} = require('./controllers/errors.controller.js')

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send({ msg: 'connected to the games server' })
})

app.use('/api', apiRouter)

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handle500Errors)

app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'path not found' })
})

module.exports = app
