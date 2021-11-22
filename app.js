const express = require('express')
const app = express()
const apiRouter = require('./routers/api.router')
const cors = require('cors')
const {
  handleCustomErrors,
  handle500Errors,
  handlePsqlErrors,
} = require('./controllers/errors.controller.js')

app.use(cors())
app.use(express.json())
app.use('/api', apiRouter)

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handle500Errors)

app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'path not found' })
})

module.exports = app
