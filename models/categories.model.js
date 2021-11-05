const db = require('../db/connection')

exports.fetchAllCategories = async () => {
  const {rows} = await db.query(`SELECT * FROM categories;`)
    return rows
}

exports.fetchCategoryBySlug = async (slug) => {
  const {rows} = await db.query(`SELECT * FROM categories WHERE slug = $1;`, [slug]);
  return rows[0]
}
