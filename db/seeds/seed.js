const db = require('../connection')
const format = require('pg-format')
const { dropTables, createTables } = require('./manage-tables')

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data
  return dropTables()
    .then(() => createTables())
    .then(() => {
      const insertedUsers = format(
        `INSERT INTO users 
      (username, name, avatar_url)
      VALUES
      %L
      RETURNING *;`,
        userData.map((user) => {
          return [user.username, user.name, user.avatar_url]
        }),
      )
      return db.query(insertedUsers)
    })
    .then(() => {
      const insertedCategories = format(
        `INSERT INTO categories 
      (slug, description)
      VALUES
      %L
      RETURNING *;`,
        categoryData.map((category) => {
          return [category.slug, category.description]
        }),
      )
      return db.query(insertedCategories)
    })
    .then(() => {
      const insertedReviews = format(
        `INSERT INTO reviews 
      (title, designer, owner, review_img_url, review_body, category, created_at, votes)
      VALUES
      %L
      RETURNING *;`,
        reviewData.map((review) => {
          return [
            review.title,
            review.designer,
            review.owner,
            review.review_img_url,
            review.review_body,
            review.category,
            review.created_at,
            review.votes,
          ]
        }),
      )
      return db.query(insertedReviews)
    })
    .then(() => {
      const insertedComments = format(
        `INSERT INTO comments 
      (body, votes, author, review_id, created_at)
      VALUES
      %L
      RETURNING *;`,
        commentData.map((comment) => {
          return [
            comment.body,
            comment.votes,
            comment.author,
            comment.review_id,
            comment.created_at,
          ]
        }),
      )
      return db.query(insertedComments)
    })
}

module.exports = seed
