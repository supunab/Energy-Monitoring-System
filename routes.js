const PageController = require("./src/controllers/PageController");
const AuthController = require("./src/controllers/AuthController");
const ConnectionController = require("./src/controllers/ConnectionController");

module.exports = function (app, passport) {

    //pages
	app.get('/', PageController.getIndex);

	//auth routes
    app.get('/login', AuthController.getLogin);
    app.get('/signup', AuthController.getSignup);
    app.get('/logout', AuthController.getLogout);
    app.post('/login', AuthController.postLogin);
    app.post('/signup', AuthController.postSignup);

    //Connection routes
    app.get('/connection/request', ConnectionController.getRequest);


    // For admin
    // Publish Power Cuts
    app.get("/powercuts", (req, res) => {res.render('admin/publishPowerCut')});
    app.post("/powercuts")

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
