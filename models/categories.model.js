const db = require('../db/connection')

exports.fetchAllCategories = async () => {
  const {rows} = await db.query(`SELECT * FROM categories;`)
    return rows
}

exports.fetchCategoryBySlug = async (slug) => {
  const {rows} = await db.query(`SELECT * FROM categories WHERE slug = $1;`, [slug])
  if (rows.length === 0) {
    return Promise.reject({ status:404, msg: 'category not found' }) 
  }
  return rows[0]
}


