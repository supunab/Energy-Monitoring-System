const PageController = require("./src/controllers/PageController");
const AuthController = require("./src/controllers/AuthController");

module.exports = function (app, passport) {

	app.get('/', PageController.getIndex);
    app.get('/login', AuthController.getLogin);
    app.get('/signup', AuthController.getSignup);
    app.get('/logout', AuthController.getLogout);
    app.post('/login', AuthController.postLogin);
    app.post('/signup', AuthController.postSignup);

    //dummy routes to test viwes.
    app.get("/breakdownreport", (req, res) => {res.render('breakdown/report');});
    app.get("/breakdownupdate", (req, res) => {res.render('breakdown/update_status');});
    app.get("/connectionrequest", (req, res) => {res.render('connection/request');});
};


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
