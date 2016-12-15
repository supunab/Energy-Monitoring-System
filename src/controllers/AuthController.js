exports.loginGET = function (req, res) {
    res.render('login', {message: req.flash('loginMessage')});
};

exports.signupGET = function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', {message: req.flash('signupMessage')});
};

//
exports.logoutGET = function (req, res) {
    req.logout();
    res.redirect('/');
};

//post login

exports.loginPOST = function (passport) {
    passport.authenticate('local-login', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages

    })
};

// post signup
exports.signupPOST = function (passport) {
    passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages

    })
};