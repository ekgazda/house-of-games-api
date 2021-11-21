const usersRouter = require('express').Router()
const { getUsers, getUserByUN } = require('../controllers/users.controller')

usersRouter.route('/').get(getUsers)
usersRouter.route('/:username').get(getUserByUN)

module.exports = usersRouter