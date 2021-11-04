const apiRouter = require('express').Router()
const categoriesRouter = require('./categories.router')
const reviewsRouter = require('./reviews.router')
const commentsRouter = require('./comments.router')

apiRouter.get('/', (req, res) => {
  res.status(200).send({ msg: 'connected to the games server' })
})

apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/reviews', reviewsRouter)
apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter
