const passport = require('passport');

exports.getLogin = function(req, res) {
    res.render('login', {message: req.flash('loginMessage')});
}

exports.getSignup = function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', {message: req.flash('signupMessage')});
}

    //
exports.getLogout = function (req, res) {
    req.logout();
    res.redirect('/');
}

    //post login
exports.postLogin = function(req, res) {

}

    // post signup
exports.postSignup = function (req, res) {

}






