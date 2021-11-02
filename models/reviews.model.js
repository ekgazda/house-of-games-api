const db = require('../db/connection')
const { convertStrValueToNum } = require('../utils')

exports.selectReviewById = async (review_id) => {
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
  count(comments.comment_id) AS comment_count
  FROM reviews
  LEFT JOIN comments ON reviews.review_id = comments.review_id
  WHERE reviews.review_id = $1
  GROUP BY reviews.review_id`

  const { rows } = await db.query(selectQuery, [review_id])
  const formattedReview = convertStrValueToNum(rows[0], 'comment_count')

  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: 'no review found' })
  }
  return formattedReview
}
