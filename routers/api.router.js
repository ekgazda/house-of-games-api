const apiRouter = require('express').Router()
const categoriesRouter = require('./categories.router.js')
const reviewsRouter = require('./reviews.router.js')

apiRouter.get('/', (req, res) => {
  res.status(200).send({ msg: 'connected to the games server' })
})

apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/reviews', reviewsRouter)

module.exports = apiRouter
