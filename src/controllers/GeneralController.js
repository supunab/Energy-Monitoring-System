import Area from "../model/Area"
import DB from "../controllers/DBController"

exports.getAllAreas = function(req, res, next){
    // Get all the areas from the database
    Area.find({}, {}, function (err, data) {
        if (err){
            res.end("Error retrieving areas from the database");
            return next(err);
        }
        res.jsonp(data);
    })
};


exports.getAllCustomers = function (req, res, next) {
    // Get all the customer names form DB with id
    DB.execQuery("SELECT id, CONCAT(first_name,' ',last_name) AS name FROM Customer", function (err, data) {
        if (err) {
            console.log(err);
            return next(err);
        }

        res.jsonp(data);
    })
};

exports.getConnection = function (req, res, next) {

    // Get all the customer names form DB with id
    DB.execQuery("SELECT id FROM Connection WHERE id LIKE ?", [req.query.connection], function (err, data) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.jsonp(data);
    })
};