const {
  selectReviewById,
  increaseVotesOnReviewById,
  fetchSortedReviews,
  fetchCommentsForReviewById,
} = require('../models/reviews.model')

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params
  selectReviewById(review_id)
    .then((review) => res.status(200).send({ review }))
    .catch(next)
}

exports.updateReviewById = (req, res, next) => {
  const { review_id } = req.params
  const { inc_votes } = req.body
  increaseVotesOnReviewById(review_id, inc_votes)
    .then((review) => res.status(200).send({ review }))
    .catch(next)
}

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query
  fetchSortedReviews(sort_by, order, category)
    .then((reviews) => res.status(200).send({ reviews }))
    .catch(next)
}

exports.getCommentsForReviewById = (req, res, next) => {
  const { review_id } = req.params
  fetchCommentsForReviewById(review_id)
    .then((comments) => res.status(200).send({ comments }))
    .catch(next)
}
