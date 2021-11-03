const db = require('../db/connection')

exports.selectReviewById = async (reviewId) => {
  const selectQuery = `
  SELECT
  reviews.review_id,
  reviews.title,
  reviews.designer,
  reviews.owner,
  reviews.review_img_url,
  reviews.review_body,
  reviews.category,
  reviews.created_at,
  reviews.votes,
  count(comments.comment_id)::INT AS comment_count
  FROM reviews
  LEFT JOIN comments ON reviews.review_id = comments.review_id
  WHERE reviews.review_id = $1
  GROUP BY reviews.review_id`

  const { rows } = await db.query(selectQuery, [reviewId])
  if (rows.length === 0) {
    throw 'not found'
  }
  return rows[0]
}

exports.increaseVotesOnReviewById = async (reviewId, voteAmount) => {
  const patchQuery = `
    UPDATE reviews
    SET votes = votes + $2
    WHERE review_id = $1
    RETURNING *
  `
  const { rows } = await db.query(patchQuery, [reviewId, voteAmount])
  if (rows.length === 0) {
    throw 'not found'
  }
  return rows[0]
}
