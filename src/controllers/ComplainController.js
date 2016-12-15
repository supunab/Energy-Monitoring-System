import Complaint from '../model/Complaint'
const DB = require("./DBController");

exports.getShow = function(req, res){
    DB.execQuery("SELECT Complaint.id, comp_type, description, title, comment, User.id as userid, User.first_name as username from " +
        "Complaint join User where Complaint.user_id = User.id and Complaint.id = ?", [req.params.id], function (err, result) {
        if(err){
            console.log("error" , err);
        }else{
            if(result.length == 0){
                res.send("404");
            }else{
                if(result[0].userid == req.user.id.int){
                    res.render('complain/view', {complain: result[0]});
                }else{
                    res.send("404 - you are unauthorized to view this post");
                }
            }
        }
    });
};

// return all complain objects only for admins
exports.getIndex = function (req, res) {
    Complaint.find({user_id : req.user.id.int},(err, complains) => {
        res.render('complain/index', {complains : complains});
    });
};

exports.CreateComplainGET = function (req, res) {
    if(req.user == null){
        res.render('index');
    }else{
        res.render('complain/create');
    }
};

// save complain
exports.createComplainPOST = function (req, res) {
    req.check('title', "Title cannot be empty").notEmpty();
    req.check('description', "Description cannot be empty").notEmpty();
    req.check('category', "You should select a category").notEmpty();

    let err = req.validationErrors();
    if (err){
        res.render('complain/create', {message: err, value: req.body});
    }else{
        let c = new Complaint();

        c.title.set(req.body.title);
        c.description.set(req.body.description);
        c.comment.set("");
        c.comp_type.set(req.body.category);
        c.user_id.set(req.user.id.get());

        c.save(function (err, result) {
            if(err){
                //TODO push errors to view with values
                console.log("err");
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

                }else{
                    let selArray = [];
                    for (let x = 0; x < 2; x++){
                        if (x == Cmpl.comp_type){
                            selArray.push("selected");
                        }else{
                            selArray.push("");
                        }
                    }
                    res.render('complain/edit',{complain:Cmpl, selArr: selArray});
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
            //TODO push error to view with values
        }else{
            console.log(req.body);

            DB.execQuery("UPDATE Complaint SET comment = ?," +
                "comp_type = ?, description = ?, title = ? where id = ?",
                ["", req.body.category, req.body.description,
                    req.body.title, req.body.id], function (err, result) {
                    if(err){
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
        if(result[0].user_id == req.user.id.int ){
            console.log("asdf");
            DB.execQuery("DELETE FROM Complaint where id = ? ", [req.params.id],
            function (e, result) {
                if (e){
                    //ERROR
                }else{
                    res.redirect('/complain/');
                }
            })
        }else{
            res.send("401");
        }
    });
}