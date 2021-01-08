const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authenticateUser(username, password, db) {
  return new Promise((resolve, reject) => {
    const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
    const params = [username];
    db.query(sql, params)
      .then(result => {
        const [user] = result.rows;
        if (!user) {
          throw new ClientError(401, 'Username or password aren\'t valid.');
        }
        const { userId, hashedPassword } = user;
        return argon2
          .verify(hashedPassword, password)
          .then(isMatching => {
            if (!isMatching) {
              throw new ClientError(401, 'Username or password aren\'t valid.');
            }
            const payload = { userId, username };
            const token = jwt.sign(payload, process.env.TOKEN_SECRET);
            resolve({ token, user: payload });
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}
module.exports = authenticateUser;
