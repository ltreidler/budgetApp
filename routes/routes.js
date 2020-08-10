const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.get('/', (req, res) => {
        //check if the user is logged in
        console.log('home');
    });

    app.get('/dash', requireLogin, (req, res) => {
        console.log('Go to dash');
    });
}