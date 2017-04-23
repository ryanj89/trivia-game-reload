const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const authHelpers = require('./_helpers');

const init = require('./passport');
const knex = require('../db/connection');

const options = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback'
};

init();

passport.use(new GoogleStrategy(options, (accessToken, refreshToken, profile, done) => {
  // Check db to see if the username exists
  return done(null, profile);
  console.log('accessToken: ', accessToken);
  console.log('refreshToken: ', refreshToken);
  console.log('profile: ', profile);
}))

module.exports = passport;