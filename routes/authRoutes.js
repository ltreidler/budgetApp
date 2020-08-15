const passport = require('passport');
const userIsNew = require('../middlewares/userIsNew');
const updateThisMonth = require('../middlewares/updateThisMonth');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );
    
    app.get('/auth/google/callback',
        passport.authenticate('google'), 
        userIsNew,
        (req, res) => res.send(user));

    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        console.log('logging out');
        req.logout();
        res.redirect('/');
    })
}