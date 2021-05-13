
const isLoggedIn = (req,res,next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You Need To Login First');
        return res.redirect('/user_login');
    }
    next();
}

module.exports = {
    isLoggedIn
}






