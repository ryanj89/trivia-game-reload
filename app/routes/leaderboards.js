const express = require('express');
const router = express.Router();
const routeHelpers = require('./_helpers');
const authHelpers = require('../auth/_helpers');
const knex = require('../db/connection');

router.get('/', (req, res, next) => {
  knex('leaderboards').then(response => {
    res.send(response);
  })
});

router.post('/', (req, res, next) => {
  const score = {
    username: req.body.username,
    score: req.body.score
  }
  knex('leaderboards')
    .insert(score)
    .returning('*')
    .then(scores => res.json(scores))
    .catch(err => next(err));
});

module.exports = router;
