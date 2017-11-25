const router = require('express').Router(),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  env = require('../env')

passport.use(
  // configuration passport will use to authenticate
  new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/verify'
  },
  (accessToken, refreshToken, profile, done) => {

    // check what information you are receiving
    console.log(profile)
    
    // function used to verify
    // usually a database call is made here
    if (profile && profile.emails && profile.emails[0].value) {
      // I'm authorized!
      return done(null, { email: profile.emails[0].value })
    }
    // not authorized
    return done(null, false)
  }
))

// scope request for what info is needed
router.get('/',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' }))

router.get('/verify',
  passport.authenticate('google', { session: false }),
  (req, res, next) => {
    // the information sent from passport
    // sent in the request as user
    const { user } = req

    if (!user) {
      return res.redirect('/?google_authorization_unsuccessful')
    }
    res.redirect(`/?authorized_as_${user.email}`)
  })

module.exports = router