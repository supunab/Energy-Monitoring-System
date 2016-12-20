import Complaint from '../model/Complaint'
const DB = require("./DBController");

exports.getShow = function(req, res){
    DB.execQuery("SELECT Complaint.id, comp_type, description, title, comment, User.id as userid, User.first_name as username from " +
        "Complaint join User where Complaint.user_id = User.id and Complaint.id = ?", [req.params.id], function (err, result) {
        if(err){
            console.log(err);
            res.render("errorPage"); //if some sql error occur
        }else{
            if(result.length == 0){
                res.render('pageNotAvailable');
            }else{
                if(result[0].userid == req.user.id.int){
                    res.render('complain/view', {complain: result[0]});
                }else{
                    DB.execQuery("SELECT is_admin from User where id= ?", [req.user.id.int],
                        function (err, admin) {
                            if (admin[0].is_admin == 1) {
                                res.render("complain/complainAdminView");
                            } else {
                                res.render('unAuthenticatePage');
                            }
                        });
                }
            }
        }
    });
};

exports.getIndex = function (req, res) {
    DB.execQuery("SELECT is_admin from User where id = ?", [req.user.id.int],
        function (err, admin) {
            if (err) {
                console.log(err);
                res.render("errorPage", {pageTitle: "Error"});
            } else {
                if (admin[0].is_admin == 0) { // normal users
                    Complaint.find({user_id: req.user.id.int}, {}, function (err, complains) {
                        console.log('normal User', complains);
                        res.render('complain/index', {complains: complains, pageTitle: "Complaints"});
                    });
                } else { // for admin
                    // return all complains
                    DB.execQuery("SELECT c.id AS id, c.comment AS comment, c.comp_type AS comp_type, " +
                        "c.description AS description, c.title AS title, u.first_name AS first_name," +
                        "u.last_name AS last_name FROM Complaint AS c JOIN User AS u ON c.user_id = u.id", [],
                        function (err, complains) {
                            res.render('complain/index', {complains : complains, pageTitle: "Complaints - admin", layout: 'admin-main'});
                        });

                }
            }
        });
};

exports.CreateComplainGET = function (req, res) {
    if(req.user == null){
        res.render('index');
    }else{
        res.render('complain/create', {pageTitle: 'Make a complaint'});
    }
};

// save complain
exports.createComplainPOST = function (req, res) {
    req.check('title', "Title cannot be empty").notEmpty();
    req.check('description', "Description cannot be empty").notEmpty();
    req.check('category', "You should select a category").notEmpty();

    let err = req.validationErrors();
    if (err){
        res.render('complain/create', {message: err, value: req.body, pageTitle: 'Make a complaint'});
    }else{
        let c = new Complaint();

        c.title.set(req.body.title);
        c.description.set(req.body.description);
        c.comment.set("");
        c.comp_type.set(req.body.category);
        c.user_id.set(req.user.id.get());

        c.save(function (err, result) {
            if(err){
                res.render("errorPage", {pageTitle: "Error"});
            }else{
                c.id.set(result.insertId);
                res.redirect('/complain/' + result.insertId);
            }
        });
    }

};

// return complain edit form with complain
exports.editComplainGET = function (req, res) {
    DB.execQuery("SELECT user_id from Complaint where id = ?", [req.params.id], function (err, result) {

        if(result[0].user_id == req.user.id.int){
            //authorized
            Complaint.findOne({id: req.params.id},function (err, Cmpl) {
                if(err){
                    console.log(err);
                    res.render("errorPage", {pageTitle: 'Error'});
                }else{
                    res.render('complain/edit', {message: [], value: Cmpl, pageTitle: 'Complain Edit'});
                }
            });
        }else{
            res.send("401");
        }
    })
};

// update the complain object
exports.editComplainPOST = function (req, res) {
    Complaint.findOne({id: req.params.id}, (err, cmpl) =>{
        req.check('title', "Title cannot be empty").notEmpty();
        req.check('description', "Description cannot be empty").notEmpty();
        req.check('category', "You should select a category").notEmpty();

        let e = req.validationErrors();
        if (e){
            res.render('complain/edit', {message: err, value: req.body, pageTitle: "Complain Edit"});
        }else{
            DB.execQuery("UPDATE Complaint SET comment = ?," +
                "comp_type = ?, description = ?, title = ? where id = ?",
                ["", req.body.category, req.body.description,
                    req.body.title, req.body.id], function (err, result) {
                    if(err){
                        console.log(err);
                        //TODO send errors
                    }else{
                        res.redirect('/complain/' + req.body.id);
                    }
                });
        }
    });
};

// delete a complain
exports.deletePOST = function (req, res) {
    DB.execQuery("SELECT user_id from Complaint where id = ?",
        [req.params.id], function (err, result) {
            if (result[0].user_id == req.user.id.int) {
                DB.execQuery("DELETE FROM Complaint where id = ? ", [req.params.id],
                    function (e, result) {
                        if (e) {
                            //ERROR
                        } else {
                            res.redirect('/complain/');
                        }
                    })
            } else {
                res.send("401");
            }
        });
}

exports.adminCommentPost = function (req, res) {
    DB.execQuery("SELECT is_admin from User where id = ?", [req.user.id.int],
        function (err, admin) {
            if (err) {
                console.log(err);
                res.render("errorPage", {pageTitle: 'Error'});
            } else {
                if (admin[0].is_admin == 0) { // normal users
                    res.send("401");
                } else { // for admin
                    console.log("admin here");
                    DB.execQuery("UPDATE Complaint SET comment = ? where id = ?", [req.body.comment, req.params.id],
                        function (e, result) {
                            res.redirect('/complain/');
                        });
                }
            }
        });
}

exports.adminCommentGET = function (req, res) {
    DB.execQuery("SELECT * from Complaint where id = ?", [req.params.id], function (err, comp) {
        res.render("complain/complainAdminView", {complain : comp[0], pageTitle:'Complains', layout : 'admin-main'});

    });
}