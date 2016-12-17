import Area from "../model/Area"

exports.getAllAreas = function(req, res, next){
    // Get all the areas from the database
    Area.find({}, function(err, data){
        if (err){
            res.end("Error retrieving areas from the database");
            return next(err);
        }
        res.json(data);
    })
};