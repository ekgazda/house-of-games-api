exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg })
  }
  next(err)
}

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === '22P02' || err.code === '23503') {
    res.status(400).send({ msg: 'invalid input' })
  }
  if (err.code === '23502') {
    res.status(400).send({ msg: 'input missing' })
  }

  next(err)
}

exports.handle500Errors = (err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: 'internal server error' })
}
