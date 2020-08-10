const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const passport = require('passport');
require('./services/passport');
require('./models/Schemas');

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
      keys: ['jflakdjs;'] //encrypts the cookies based on a key
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require('./routes/authRoutes')(app);

app.get('/', (req,res) => {
    res.send('Thanks!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);