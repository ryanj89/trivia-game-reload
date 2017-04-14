const express = require('express');
const router = express.Router();

const routeHelpers = require('./_helpers');
const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

router.post('/register', authHelpers.loginRedirect, (req, res, next) => {
  return authHelpers.createUser(req, res)
    .then(response => {
      passport.authenticate('local', (err, user, info) => {
        if (user) { routeHelpers.handleResponse(res, 200, 'success'); }
      })(req, res, next);
    })
    .catch(err => { routeHelpers.handleResponse(res, 500, 'error'); });
});

router.post('/login', authHelpers.loginRedirect, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { routeHelpers.handleResponse(res, 500, 'error'); }
    if (!user) { routeHelpers.handleResponse(res, 404, 'User not found'); }
    if (user) {
      req.logIn(user, (err) => {
        if (err) { routeHelpers.handleResponse(res, 500, 'error'); }
        routeHelpers.handleResponse(res, 200, 'success');
      });
    }
  })(req, res, next);
});

router.get('/logout', authHelpers.loginRequired, (req, res, next) => {
  req.logOut();
  routeHelpers.handleResponse(res, 200, 'success');
});

module.exports = router;