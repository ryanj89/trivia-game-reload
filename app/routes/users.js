const router = require('express').Router();
const knex = require('../db');

router.get('/', (req, res) => {
  knex('users').then((users) => {
    res.json(users);
  });
});

module.exports = router;
