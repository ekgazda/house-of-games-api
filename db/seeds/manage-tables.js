const db = require('../connection')

exports.dropTables = () => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => db.query(`DROP TABLE IF EXISTS reviews;`))
    .then(() => db.query(`DROP TABLE IF EXISTS categories;`))
    .then(() => db.query(`DROP TABLE IF EXISTS users;`))
}

exports.createTables = () => {
  return db
    .query(
      `CREATE TABLE users (
        username VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        avatar_url TEXT NOT NULL);`,
    )
    .then(() => {
      return db.query(
        `CREATE TABLE categories (
          slug VARCHAR PRIMARY KEY,
          description TEXT NOT NULL);`,
      )
    })
    .then(() => {
      return db.query(
        `CREATE TABLE reviews (
          review_id SERIAL PRIMARY KEY,
          title VARCHAR NOT NULL,
          designer VARCHAR NOT NULL,
          owner VARCHAR REFERENCES users(username) NOT NULL,
          review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
          review_body VARCHAR NOT NULL,
          category VARCHAR REFERENCES categories(slug) NOT NULL,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          votes INT DEFAULT 0);`,
      )
    })
    .then(() => {
      return db.query(
        `CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          body TEXT NOT NULL,
          votes INT DEFAULT 0,
          author VARCHAR REFERENCES users(username) NOT NULL,
          review_id INT REFERENCES reviews(review_id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP);`,
      )
    })
}
