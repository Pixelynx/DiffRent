const { db } = require('../db/index')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const init = require("./passport");
const helpers = require("./helpers");

passport.use(
    new LocalStrategy((email, password, done) => {
      db.one("SELECT * FROM tenants WHERE email = ${email}", {
        email: email
      })
        .then(user => {
          if (!helpers.comparePass(password, user.password_digest)) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch(err => {
          return done(err);
        });
    })
  );
  
  init();
  
  module.exports = passport;
