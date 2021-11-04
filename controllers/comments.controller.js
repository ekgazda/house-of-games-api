const {
  fetchCommentsForReviewById,
  addCommentForReviewById,
} = require('../models/comments.model')

exports.getCommentsForReviewById = (req, res, next) => {
  const { review_id } = req.params
  fetchCommentsForReviewById(review_id)
    .then((comments) => res.status(200).send({ comments }))
    .catch(next)
}

exports.postCommentForReviewById = (req, res, next) => {
  const { review_id } = req.params
  addCommentForReviewById(review_id, req.body)
    .then((comment) => res.status(201).send({ comment }))
    .catch(next)
}
