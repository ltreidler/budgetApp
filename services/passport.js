const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
require('../models/User');

const User = mongoose.model('users');

//create a cookie with an id inside it
passport.serializeUser((user, done) => {
    //takes in mongo id, not google id
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
        const existingUser = await User.findOne({googleId: profile.id});
        if(existingUser) {
            done(null, existingUser);
        }
        const user = await new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: {First: profile.name.givenName, Last: profile.name.familyName}
        }).save();
        done(null, user);
    }
));


// const userSchema = new Schema({
//     googleId: String,
//     email: String,
//     name: {First: String, Last: String},
//     items: [itemSchema],
//     subscriptions: [subscriptionSchema],
//     incomes: [incomeSchema],
//     budget: budgetSchema,
//     accounts: [accountsSchema],
//     bills: [billSchema],
//     debt: Number,
//     thisMonth: Number,
//     total: Number,
//     second: Boolean
// });