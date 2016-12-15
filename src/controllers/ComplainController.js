const Complain = require('./../model/Complain');


// return all complain objects only for admins
exports.getIndex = function (req, res) {
    let complains = Complain.find();
    console.log(complains);
};


exports.getCreateComplain = function (req, res) {
    res.render('complain/create');
};

// save complain
exports.createComplainPOST = function (req, res) {

};

// return complain edit form with complain
exports.editComplainGET = function (req, res) {

};

// update the complain object
exports.editComplainPOST = function (req, res) {

};

// delete a complain
exports.deletePOST = function (req, res) {

}



