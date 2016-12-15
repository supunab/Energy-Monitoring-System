const PageController = require("./src/controllers/PageController");
const AuthController = require("./src/controllers/AuthController");
const ConnectionController = require("./src/controllers/ConnectionController");
const ComplainController = require("./src/controllers/ComplainController");

module.exports = function (app, passport) {

    //pages
	app.get('/', PageController.getIndex);

	//auth routes
    app.get('/login', AuthController.getLogin);
    app.get('/signup', AuthController.getSignup);
    app.get('/logout', AuthController.getLogout);

    app.post('/login', function (req, res) {
        passport.authenticate('local-login', {
            successRedirect: '/', // redirect to the secure profile section
            failureRedirect: '/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        })
    });
    app.post('/signup', function (req, res) {
        passport.authenticate('local-signup', {
            successRedirect: '/', // redirect to the secure profile section
            failureRedirect: '/signup', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        })
    });

    //Connection routes
    app.get('/connection/request', ConnectionController.getRequest);

    //Complains
    app.get("/complainMake", ComplainController.getCreateComplain);

    //dummy routes to test viwes.
    app.get("/breakdownreport", (req, res) => {res.render('breakdown/report');});
    app.get("/breakdownupdate", (req, res) => {res.render('breakdown/update_status');});
};


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
