const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/userModel');
const keys = require('./keys');



// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: 'http://localhost:4000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("passport:",profile)
      
   
      User.findOne({ 'google.id' : profile.id }, function(err, user) {
        if (err) return done(err);
        if (user) return done(null, user);
        else {
          // if there is no user found with that google id, create them
          let newUser = new User();
  
          // set all of the google information in our user model
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.google.name  = profile.displayName;
          newUser.google.image = profile._json.picture;
          if (typeof profile.emails != 'undefined' && profile.emails.length > 0)
            newUser.google.email = profile.emails[0].value;
  
          // save our user to the database
          newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser);
          });
        }
      });

    }
  )
)
passport.use(User.createStrategy());

require('./init.js')(User, passport);

module.exports = passport;