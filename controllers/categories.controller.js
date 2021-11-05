const { fetchAllCategories, fetchCategoryBySlug } = require('../models/categories.model')

exports.getAllCategories = (req, res, next) => {
  fetchAllCategories()
    .then((categories) => res.status(200).send({ categories }))
    .catch(next)
}

exports.getCategoryBySlug = (req, res, next) => {
  const {slug} = req.body
  fetchCategoryBySlug(slug)
  .then((category) => res.status(200).send({category}))
  .catch(next)
}