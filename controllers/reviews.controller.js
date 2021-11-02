const { selectReviewById } = require('../models/reviews.model')

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params
  selectReviewById(review_id)
    .then((review) => res.status(200).send({ review }))
    .catch((err) => next(err))
}

// exports.getReviewById = (req, res, next) => {
//   const { review_id } = req.params
//   try {
//     const review = selectReviewById(review_id)
//     res.status(200).send({ review })
//   } catch (err) {
//     next(err)
//   }
// }
