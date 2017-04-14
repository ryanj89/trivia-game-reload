const bcrypt = require('bcryptjs');
const knex = require('../db/connection');

// compare user password with salt/hash password in database
function comparePass(userPass, dbPass) {
  return bcrypt.compareSync(userPass, dbPass);
}

function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users')
    .insert({
      username: req.body.username,
      password: hash
    })
    .returning('*');
}

// 401: UNAUTHORIZED
function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });
  return next();
}

function adminRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });
  return knex('users').where({ username: req.user.username }).first()
    .then((user) => {
      if (!user.admin) return res.status(401).json({ status: 'Not authorized' });
      return next();
    })
    .catch((err) => {
      res.status(500).json({ status: 'Bad stuff happened', error: err });
    })
}

module.exports = {
  comparePass,
  createUser,
  loginRequired,
  adminRequired
}