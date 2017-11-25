const router = require('express').Router(),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  { isEqual } = require('lodash')

const localUser = {
  // test we'll check against
  username: 'user',
  password: 'letmein'
}

passport.use(new LocalStrategy(
  (username, password, done) => {
    // little assistance from lodash
    // verification against a database is usually done here 
    
    if (isEqual(localUser, { username, password })) {
      // success
      return done(null, localUser)
    }
    // failure
    return done(null, false)
  }
))

// 'local' strategy
router.get('/', passport.authenticate('local', {
  // disable session as we will use JWT
  session: false,
  successRedirect: '/?login_successful',
  failureRedirect: "/?username/password_incorrect"
}))

module.exports = router
