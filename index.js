const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const passport = require('passport');
require('./services/passport');

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const app = express();

app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
      keys: [keys.cookieKey] //encrypts the cookies based on a key
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require('./routes/authRoutes')(app);
require('./routes/routes')(app);
require('./routes/moneyRoutes')(app);
require('./routes/budgetRoutes')(app);

if(process.env.NODE_ENV === 'production') {
    //express will serve up production assets
    //like main.js file and main.css file
    
    //this is called if the browser is looking for a specific static file
    app.use(express.static('client/build'));
    
    //express will serve up index.html
    //if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
    
   };
   

const PORT = process.env.PORT || 5000;
app.listen(PORT);