const PageController = require("./src/controllers/PageController");
const AuthController = require("./src/controllers/AuthController");
const ConnectionController = require("./src/controllers/ConnectionController");
const BreakDownController = require("./src/controllers/BreakDownController");
const GeneralController = require("./src/controllers/GeneralController");
const AdminController = require("./src/controllers/AdminController");
const ComplainController = require("./src/controllers/ComplainController");
const PaymentController = require("./src/controllers/PaymentController");
const PaymentHistoryController = require("./src/controllers/PaymentHistoryController");


module.exports = function (app, passport) {
    app.get('/',isUserLoggedIn,  PageController.getIndex);

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
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    //user dash board
    app.get('/home', (req, res) => {
        res.render('user-dashboard')
    });

    // For admin
    // Publish Power Cuts
    app.get("/powercuts", (req, res) => {
        res.render('admin/publishPowerCut', {layout: 'admin-main', needAngular: true})
    });
    app.post("/newpowercut", AdminController.addPowerCut);

    // Get all areas
    app.get('/areas', GeneralController.getAllAreas);

    // For connection request approval
    app.get("/admin/connectionRequest", (req, res) => {
        res.render("admin/acceptConnectionRequest", {layout: 'admin-main', needAngular: true});
    });
    app.get("/admin/getConnectionRequest", AdminController.getConnectionReq);
    app.put("/admin/rejectConnection/:connection", AdminController.rejectConnection);
    app.post("/admin/acceptConnection", AdminController.acceptConnection)

    // Payment History for registered users
    app.get('/paymentHistoryRegistered', PaymentHistoryController.renderPage);
    app.get('/paymentHistory/getConnections/:customer', PaymentHistoryController.getConnections);
    app.get('/paymentHistory/getHistory/:data', PaymentHistoryController.getPaymentHistory);

    //Complains
    app.get("/complain", ComplainController.getIndex);
    app.get("/complain/create", ComplainController.CreateComplainGET);
    app.post("/complain/create", ComplainController.createComplainPOST);
    app.get("/complain/:id", ComplainController.getShow);
    app.get('/complain/edit/:id', ComplainController.editComplainGET);
    app.post('/complain/edit/:id', ComplainController.editComplainPOST);
    app.post("/complain/delete/:id", ComplainController.deletePOST);
    app.get("/complain/admin/:id", ComplainController.adminCommentGET);
    app.post("/complain/admin/:id", ComplainController.adminCommentPost);

    app.get("/breakdownreport", (req, res) => {res.render('breakdown/report');});
    app.get("/breakdownupdate", (req, res) => {res.render('breakdown/update_status');});
    app.get('/breakdownView',BreakDownController.getRequest);

    app.get('/connectionRequest', ConnectionController.getRequest);
    app.post('/connectionRequest',ConnectionController.postRequest);

    app.get('/admin', isAdminLoggedIn, function (req, res) {
        res.render('admin/dashboard', {layout: 'admin-main'});
    });
    app.get('/admin/powercuts', AdminController.viewPowerCut);


    app.get('/breakdownView',BreakDownController.getRequest);
    app.get('/paymentHistoryRegistered', (req, res) => {
        res.render('registeredUser/paymentHistory', {needAngular: true})
    });

    app.post('/breakdownPost',BreakDownController.postBreakdown);

    app.get('/api/get/consumption', AdminController.powerConsumption);
    app.get('/api/get/areas', GeneralController.getAllAreas);
    app.get('/api/get/connection', GeneralController.getConnection);

    app.get('/addPayments',PaymentController.getPaymentPage);
    app.post('/paymentPost',PaymentController.postPayment);

    // For unregistered users check payment history
    app.get('/paymentHistoryOther', PaymentHistoryController.renderOtherView);
    app.get('/checkConnection/:connectionID', PaymentHistoryController.checkConnectionId);

    // Add new connection - data entry
    app.get('/addNewConnection', (req, res) => {
        res.render("admin/connectionEntry", {layout: 'admin-main', needAngular: true})
    });
    app.post('/addNewConnection', AdminController.addNewConnection);
    app.get('/api/get/customers', GeneralController.getAllCustomers);

    app.get('/sortByNotFinished', BreakDownController.sortByNotFinished);
    app.get('/sortByFinished', BreakDownController.sortByFinished);


    app.post('/updateBreakDown/:id', BreakDownController.updateBreakDown);

    app.get('/getBreakDown/:id', BreakDownController.getBreakDown);
    app.get('/admin/addBill', AdminController.addBill);
    app.post('/admin/addbillPOST', AdminController.addBillPOST);
    app.get("*", PageController.errorPage404);

};


function isUserLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

function isAdminLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        if (req.user.is_admin.get()) {
            return next();
        }
        else {
            res.status(403);
            res.send("Access Denied");
        }
    }
    // if they aren't redirect them to the home page
    res.redirect('/login');
}
