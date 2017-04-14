const express = require('express');
const router = express.Router();
const routeHelpers = require('./_helpers');
const authHelpers = require('../auth/_helpers');


router.get('/user', authHelpers.loginRequired, (req, res, next) => {
  routeHelpers.handleResponse(res, 200, 'success');
});

router.get('/admin', authHelpers.adminRequired, (req, res, next) => {
  routeHelpers.handleResponse(res, 200, 'success');
});

module.exports = router;
