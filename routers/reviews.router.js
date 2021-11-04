const reviewsRouter = require('express').Router()
const {
  getReviewById,
  updateReviewById,
  getReviews,
  getCommentsForReviewById,
} = require('../controllers/reviews.controller')

reviewsRouter.route('/').get(getReviews)
reviewsRouter.route('/:review_id').get(getReviewById).patch(updateReviewById)
reviewsRouter.route('/:review_id/comments').get(getCommentsForReviewById)

module.exports = reviewsRouter
