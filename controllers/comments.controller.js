const {
  fetchCommentsForReviewById,
  addCommentForReviewById,
  fetchCommentById,
  removeCommentById,
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

exports.getCommentById = (req, res, next) => {
  const { comment_id } = req.params
  fetchCommentById(comment_id)
    .then((comment) => res.status(200).send({ comment }))
    .catch(next)
}

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params
  removeCommentById(comment_id)
    .then((comment) => res.status(204).send({ comment }))
    .catch(next)
}
