const db = require('../db/index')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const init = require("./passport");
const helpers = require("./helpers");
passport.use(
  new LocalStrategy({passReqToCallback: true},
    (req, username, password, done) => {
    console.log(req.originalUrl)
    if(req.originalUrl === "/tenants/login")
      { return db.one("SELECT * FROM users WHERE email = ${email} AND user_type='tenant'", {
        email: username
      })
      .then(user => {
        console.log(user)
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
    } else if (req.originalUrl === "/landlords/login")
    { return db.one("SELECT * FROM users WHERE email = ${email} AND user_type='landlord'", {
      email: username
    })
    .then(user => {
      console.log(user)
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
  }

    })
  );
  init();
  
  module.exports = passport;
