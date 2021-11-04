const db = require('../db/connection')

exports.fetchCommentsForReviewById = async (reviewId) => {
  const getCommentsQuery = `
  SELECT
    comments.comment_id,
    comments.votes,
    comments.created_at,
    comments.author,
    comments.body
  FROM comments
  JOIN reviews ON comments.review_id = reviews.review_id
  WHERE comments.review_id = $1
  GROUP BY comments.comment_id`

  const { rows } = await db.query(getCommentsQuery, [reviewId])
  if (rows.length === 0) throw 'not found'
  return rows
}

exports.addCommentForReviewById = async (reviewId, newComment) => {
  const newCommentQuery = `
  INSERT INTO comments 
  (review_id, author, body)
  VALUES 
  ($1, $2, $3)
  RETURNING *`

  const { rows } = await db.query(newCommentQuery, [
    reviewId,
    newComment.username,
    newComment.body,
  ])
  return rows[0]
}

exports.removeCommentById = async (commentId) => {
  const removeCommQuery = `
  DELETE FROM comments
  WHERE comment_id = $1`
  const {rows} = await db.query(removeCommQuery, [commentId])
  return rows
}
