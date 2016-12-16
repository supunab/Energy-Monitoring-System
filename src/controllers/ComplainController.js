import Complaint from '../model/Complaint'
import User from "../model/User"

exports.getShow = function(req, res){
    Complaint.findOne({'id' : req.params.id}, function (err, cmpln) {
        if (err){
            res.send("404");
        }else {
            User.findOne({id : cmpln.user_id}, (err, usr) => {
               res.render('complain/view', {complain: cmpln, username : usr.first_name});
            });
        }
    });
};

// return all complain objects only for admins
exports.getIndex = function (req, res) {
    let complains = Complaint.find();
    console.log(complains);
};


exports.CreateComplainGET = function (req, res) {
    res.render('complain/create');
};

// save complain
exports.createComplainPOST = function (req, res) {
    req.check('title', "Title cannot be empty").notEmpty();
    req.check('description', "Description cannot be empty").notEmpty();
    req.check('category', "You should select a category").notEmpty();

    var err = req.validationErrors();
    if (err){
        res.render('complain/create', {message: err, value: req.body});
    }else{
        let c = new Complaint();

        c.title.set(req.body.title);
        c.description.set(req.body.description);
        c.comment.set("");
        c.comp_type.set(req.body.category);
        c.user_id.set(req.user.id.get());

        console.log(c);
        c.save(function (err, result) {
            if(err){

            }else{
                c.id.set(result.insertId);
                this.getShow(req, res);
            }
        });
    }

};

// return complain edit form with complain
exports.editComplainGET = function (req, res) {
    req.check('title', "Title cannot be empty").notEmpty();
    req.check('description', "Description cannot be empty").notEmpty();
    req.check('category', "You should select a category").notEmpty();

    let err = req.validationErrors();
    if (err){

    }else{

    }
};

// update the complain object
exports.editComplainPOST = function (req, res) {

};

// delete a complain
exports.deletePOST = function (req, res) {

}



