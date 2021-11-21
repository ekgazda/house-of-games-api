const apiRouter = require('express').Router()
const categoriesRouter = require('./categories.router')
const reviewsRouter = require('./reviews.router')
const commentsRouter = require('./comments.router')
const usersRouter = require('./users.router')
const { getAllEndpoints } = require('../controllers/api.controller')

apiRouter.route('/').get(getAllEndpoints)

apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/reviews', reviewsRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/users', usersRouter)

module.exports = apiRouter
