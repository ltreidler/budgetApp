module.exports = (req, res, next) => {
    //check to see if the user is logged in
    //if so, go next()
    //else, go to home
    if(req.user) {
        console.log('user is logged in');
        next();
    } else {
        console.log('user is not logged in');
        res.redirect('/');
    }
}