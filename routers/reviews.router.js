const reviewsRouter = require('express').Router()
const { getReviewById } = require('../controllers/reviews.controller')

reviewsRouter.route('/:review_id').get(getReviewById)

module.exports = reviewsRouter
