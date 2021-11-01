const categoriesRouter = require('express').Router()
const { getAllCategories } = require('../controllers/categories.controller')

categoriesRouter.route('/').get(getAllCategories)

module.exports = categoriesRouter
