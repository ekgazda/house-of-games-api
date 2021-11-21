const db = require('../db/connection')
const { selectReviewById } = require('./reviews.model')

const fetchCommentsForReviewById = async (reviewId) => {
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

  const { rows } =  await db.query(getCommentsQuery, [reviewId])
  if (await selectReviewById(reviewId)) {
    return rows
  } 
}

const addCommentForReviewById = async (reviewId, newComment) => {
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

const fetchCommentById = async (commentId) => {
  const getCommQuery = `
    SELECT * 
    FROM comments
    WHERE comment_id = $1`
  const {rows} = await db.query(getCommQuery, [commentId])
  if (rows.length === 0) {
    return Promise.reject({ status:404, msg: 'comment not found' })
  }
  return rows[0]
}

const removeCommentById = async (commentId) => {
  if (await fetchCommentById(commentId)) {
    const removeCommQuery = `
      DELETE FROM comments
      WHERE comment_id = $1`
    const {rows} = await db.query(removeCommQuery, [commentId])
    return rows
  }
}

module.exports = { 
  fetchCommentsForReviewById, 
  addCommentForReviewById, 
  fetchCommentById, 
  removeCommentById }