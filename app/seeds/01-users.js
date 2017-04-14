const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('ruby123', salt);
      return Promise.join(
        knex('users').insert({
          username: 'lbendell',
          password: hash
        })
      )
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('murphy123', salt);
      return Promise.join(
        knex('users').insert({
          username: 'ryanj89',
          password: hash,
          admin: true
        })
      );
    })
};