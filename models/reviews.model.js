const db = require('../db/connection')
const { fetchCategoryBySlug } = require('./categories.model')

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
    return Promise.reject({status:404, msg: 'review not found'})
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
    return Promise.reject({status:404, msg: 'review not found'})
  }
  return rows[0]
}


exports.fetchSortedReviews = async (
  sort_by = 'created_at',
  order = 'desc',
  category,
) => {
  const sortByOptions = [
    'review_id',
    'title',
    'designer',
    'owner',
    'review_img_url',
    'review_body',
    'category',
    'created_at',
    'votes',
    'comment_count',
  ]
  if (!sortByOptions.includes(sort_by) || !['asc', 'desc'].includes(order)) {
    return Promise.reject({status:400, msg: 'invalid query'})
  }

  let getReviewsQuery = `
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
  `

  if(category) {
    if (await fetchCategoryBySlug(category)) {
      getReviewsQuery += `WHERE reviews.category = '${category}'`
    }
  }

  getReviewsQuery += `
    GROUP BY reviews.review_id
    ORDER BY ${sort_by} ${order}
  `
  const { rows } = await db.query(getReviewsQuery)
  return rows
}

