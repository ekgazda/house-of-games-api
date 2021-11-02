const {
  selectReviewById,
  increaseVotesOnReviewById,
} = require('../models/reviews.model')

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params
  selectReviewById(review_id)
    .then((review) => res.status(200).send({ review }))
    .catch((err) => next(err))
}

exports.updateReviewById = async (req, res, next) => {
  const { review_id } = req.params
  const { inc_votes } = req.body
  try {
    const review = await increaseVotesOnReviewById(review_id, inc_votes)
    res.status(200).send({ review })
  } catch (err) {
    next(err)
  }
}
