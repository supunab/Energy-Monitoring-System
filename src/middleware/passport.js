// load all the things we need
let LocalStrategy = require('passport-local').Strategy;

// load up the user model
import User from '../model/User'
import Customer from '../model/Customer'
import DB from '../controllers/DBController'

// expose this function to our app using module.exports
module.exports = function (passport, app) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id.get());
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            let loggedin = new User();
            loggedin.fromDB(user);
            done(err, loggedin);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function () {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({'email': email}, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // if there is no user with that email
                        // create the user
                        let newUser = new User();

                        // set the user's local credentials
                        newUser.email.set(email);
                        newUser.password.set(User.generateHash(password));
                        newUser.customer_id.set(req.body.customer_id);
                        let sql = "START TRANSACTION;" +
                            "INSERT INTO Customer(first_name," +
                            "last_name," +
                            "id" +
                            ")" +
                            "VALUES(?,?,?);" +

                            "INSERT INTO User(email," +
                            "password," +
                            "customer_id" +
                            ") " +
                            "VALUES(?,?,?);" +
                            "COMMIT;";
                        // save the user
                        if (req.body.signupChioce == "new_customer") {
                            DB.execQuery(sql,
                                [req.body.first_name, req.body.last_name, req.body.customer_id >> 0, email, User.generateHash(password), req.body.customer_id >> 0],
                                function (err, result) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        newUser.id.set(result[2].insertId);
                                        return done(null, newUser);
                                        app.locals.user = newUser.email.get();
                                        app.locals.id = newUser.id.get();
                                    }
                                }
                            )
                        } else {
                            newUser.save(function (err, result) {
                                if (err)
                                    throw err;
                                app.locals.user = newUser.email.get();
                                app.locals.id = newUser.id.get();
                                return done(null, newUser);
                            });
                        }
                    }

                });

            });

        }));


    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({'email': email}, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err) {
                    console.log(err);
                    return done(err);
                }
                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                let loggedin = new User();

                loggedin.fromDB(user);
                // if the user is found but the password is wrong
                if (!loggedin.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                // all is well, return successful user
                app.locals.user = loggedin.email.get();
                app.locals.id = loggedin.id.get();
                return done(null, loggedin);
            });

        }));

};