const db = require('../db/connection')

exports.selectReviewById = (review_id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1;`, [review_id])
    .then(({ rows }) => rows[0])
  // let sqlQuery = `
  //   SELECT
  //     title,
  //     designer,
  //     owner,
  //     review_img_url,
  //     review_body,
  //     category,
  //     created_at,
  //     votes;
  // `
  // join tables:
  // FROM reviews
  // JOIN comments ON reviews.review_id = comments.review_id;

  // return db.query(sqlQuery).then(({ rows }) => {
  //   return rows[0]
  // })
}

// add comment_count
