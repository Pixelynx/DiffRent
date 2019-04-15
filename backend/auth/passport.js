const passport = require('passport')
const db = require('../db/index')

module.exports = () => {
    passport.serializeUser((user, done) => {
      done(null, user.email);
    });
  
    passport.deserializeUser((username, done) => {
      db.one("SELECT * FROM landlords WHERE email = ${email}", {
        email: username
      })
        .then(user => {
          done(null, user.email);
        })
        .catch(err => {
          done(err, null);
        });
    });
  };