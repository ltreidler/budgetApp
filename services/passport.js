const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
require('../models/User');

const User = mongoose.model('users');

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
            done(null, createBasicUser(user));
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
        done(null, createBasicUser(user));
    }
));

function createBasicUser({_id, name, thisMonth, total, email}){
    const basicUser = {
        id: _id,
        name,
        thisMonth,
        total,
        email
    };
    return(basicUser);
}


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