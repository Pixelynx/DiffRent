const db = require('../db/index')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const init = require("./passport");
const helpers = require("./helpers");
passport.use(
  new LocalStrategy((username, password, done) => {
      db.one("SELECT * FROM users WHERE email = ${email}", {
        email: username
      })
        .then(user => {
          // console.log(user)
          if (!helpers.comparePass(password, user.password_digest)) {
            // console.log('FAILED AT PASSWORD')
            return done(null, false);
          } else {
            // console.log('USER IN LCL STRAT')
            return done(null, user);
          }
        })
        .catch(err => {
          // console.log('LOCAL STRAGTEGY ERRRR', err)
          return done(err);
        });
    })
  );
  
  init();
  
  module.exports = passport;
