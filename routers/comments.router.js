const commentsRouter = require('express').Router()
const { deleteCommentById, getCommentById } = require('../controllers/comments.controller')

commentsRouter.route('/:comment_id').delete(deleteCommentById).get(getCommentById)

module.exports = commentsRouter