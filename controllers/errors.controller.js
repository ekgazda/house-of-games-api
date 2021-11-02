exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg })
  }
  next(err)
}

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'invalid input' })
  }
  next(err)
}

exports.handle404Errors = (err, req, res, next) => {
  console.log(err)
  if (err === 'not found') {
    res.status(404).send({ msg: err })
  }
  next(err)
}

exports.handle500Errors = (err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: 'internal server error' })
}
