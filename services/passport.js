const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
require('../models/User');

const User = mongoose.model('User');

//create a cookie with an id inside it
passport.serializeUser((user, done) => {
    //takes in mongo id, not google id
    console.log('serializing');
    console.log(user);
    done(null, user.id);
  });
  
  //takes in a cookie, returns a user using the id in the cookie
  passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
  });

passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({googleId: profile.id});
        if(!user) {
            user = await new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: {first: profile.name.givenName, last: profile.name.familyName}
            }).save();
        }
        done(null, user);
    }
));

// const userSchema = new Schema({
//     googleId: String,
//     email: String,
//     name: {first: String, last: String},
//     thisMonth: {type: Number, default: 0},
//     budgetTotal: {type: Number, default: 0},
//     total: {type: Number, default: 0}
// });