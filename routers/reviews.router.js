const reviewsRouter = require('express').Router()
const {
  getReviewById,
  updateReviewById,
  getReviews,
} = require('../controllers/reviews.controller')
const {
  getCommentsForReviewById,
  postCommentForReviewById,
} = require('../controllers/comments.controller')

reviewsRouter.route('/').get(getReviews)
reviewsRouter.route('/:review_id').get(getReviewById).patch(updateReviewById)
reviewsRouter
  .route('/:review_id/comments')
  .get(getCommentsForReviewById)
  .post(postCommentForReviewById)

module.exports = reviewsRouter
