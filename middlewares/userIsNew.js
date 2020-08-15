module.exports = (req, res, next) => {
    //check to see if the user is new
    //if so, go next()
    //else, go to home
    if(!req.user.moneyID) {
        console.log('user is new');
        res.redirect('/setup');
    } else {
        console.log('user is not new');
        res.redirect('/dash');
    }
}