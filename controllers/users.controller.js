const { fetchUsers, fetchUserByUN } = require('../models/users.model')

exports.getUsers = (req, res, next) => {
  fetchUsers()
  .then((users) => res.status(200).send({ users }))
  .catch(next)
}

exports.getUserByUN = (req, res, next) => {
  const { username } = req.params
  fetchUserByUN(username)
  .then((user) => res.status(200).send({ user }))
  .catch(next)
}