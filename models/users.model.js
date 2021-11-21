const db = require('../db/connection')

exports.fetchUsers = async () => {
  const {rows} = await db.query(`SELECT username FROM users;`)
    return rows
}

exports.fetchUserByUN = async (username) => {
  const getUserQuery = `
    SELECT
      username,
      avatar_url,
      name
    FROM users
    WHERE username = $1`
  
  const { rows } = await db.query(getUserQuery, [username])
    if (rows.length === 0) {
      return Promise.reject({status:404, msg: 'user not found'})
    }
    return rows[0]
}