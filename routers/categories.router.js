const categoriesRouter = require('express').Router()
const { getAllCategories, getCategoryBySlug } = require('../controllers/categories.controller')

categoriesRouter.route('/').get(getAllCategories).get(getCategoryBySlug)

module.exports = categoriesRouter
