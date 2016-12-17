const PageController = require("./src/controllers/PageController");
const AuthController = require("./src/controllers/AuthController");
const ConnectionController = require("./src/controllers/ConnectionController");
const BreakDownController = require("./src/controllers/BreakDownController");

module.exports = function (app, passport) {
    app.get('/', function (req, res) {

        res.redirect('/breakdownView');
    });
    app.get('/login', function (req, res) {
        res.render('login', {message: req.flash('loginMessage')});
    });

    app.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup', {message: req.flash('signupMessage')});
    });


    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/connectionRequest', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    //dummy routes to test viwes.
    app.get("/breakdownreport", (req, res) => {res.render('breakdown/report');});
    app.get("/breakdownupdate", (req, res) => {res.render('breakdown/update_status');});

    app.get('/connectionRequest',ConnectionController.getRequest);

    app.post('/connectionRequest',ConnectionController.postRequest);

    app.get('/breakdownView',BreakDownController.getRequest);

};


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
