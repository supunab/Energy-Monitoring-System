import Complaint from '../model/Complaint'

exports.getShow = function(req, res){
    Complaint.find(req.param.id, function (err, cmpln) {
        if (err){

        }else {
            res.render('complain/view', {complain: cmpln});
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

        c.title = req.body.title;
        c.description = req.body.description;
        c.comment = "";
        c.comp_type = req.body.category;
        c.user_id = req.user.id.int;

        console.log(c);
        c.save(function (req, res) {
            console.log("saved");
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



