import Breakdown from '../model/Breakdown';
import db from './DBController'

exports.getRequest = function (req,res) {
    db.execQuery("SELECT Breakdown.id,description,status,finished,created_at,name FROM Breakdown JOIN Area on Breakdown.area=Area.id ORDER BY Breakdown.id DESC LIMIT ?",15 ,function(err, result){

        if(err)
            throw err;
        if(result.size!=0){
            res.render('viewBreakDowns',{array : result});
        }
    });
};

exports.postRequest = function (req, res) {

};
//TODO change date tyoe
exports.postBreakdown=function (req,res) {
    let newBreakdown = new Breakdown();
    let userId = req.user.id.int;
    console.log(req.user.id.int);
    let area=req.body.area;
    let description = req.body.description;
    let finished = 0;
    let createdDate=new Date().toISOString().slice(0, 19).replace('T', ' ');
    newBreakdown.createObject(userId, area, description, null, finished);
    newBreakdown.save(function (err,result) {
        if(err)
            throw err;
        res.redirect('/breakdownreport');
    });
};


exports.sortByFinished=function (req,res) {
    db.execQuery("SELECT Breakdown.id,description,status,finished,created_at,name FROM Breakdown JOIN Area on Breakdown.area=Area.id HAVING finished=?;", 1 ,function(err, result){
        if(err)
            throw err;
        if (result.size != 0) {
            res.render('viewBreakDowns', {array: result});
        }
    });
};


exports.sortByNotFinished=function (req,res) {
    db.execQuery("SELECT Breakdown.id,description,status,finished,created_at,name FROM Breakdown JOIN Area on Breakdown.area=Area.id HAVING finished=?;", 0 ,function(err, result){
        if(err)
            throw err;
        if (result.size != 0) {
            res.render('viewBreakDowns', {array: result});
        }
    });
};

exports.updateBreakDown = function (req, res) {

    let remarks = req.body.remarks;
    let breakDownId = req.params.id;
    let finished;
    let button = req.body.group1;
    if (button === 'test1') {
        finished = 1;
    } else {
        finished = 0;
    }
    console.log(remarks, breakDownId, finished);

    db.execQuery("UPDATE breakdown SET status = ? ,finished = ? WHERE id = ?", [remarks, finished, breakDownId], function (err, result) {
        if (err) {
            console.log(err);
            res.render("errorPage");
        }
        else {
            console.log(result);
            res.render('viewBreakDowns');
        }
    });
};

exports.getBreakDown = function (req,res) {
    let breakDownId=req.params.id;
    console.log("SELECT Breakdown.id,description,status,finished,created_at,name FROM Breakdown JOIN Area on Breakdown.area=Area.id WHERE Breakdown.id=", breakDownId);
    db.execQuery("SELECT Breakdown.id,description,status,finished,created_at,name FROM Breakdown JOIN Area on Breakdown.area=Area.id WHERE Breakdown.id=?", breakDownId ,function(err, result){
        if(err) {
            console.log(err);
            res.render("errorPage");
        } else {
            console.log(result);
            res.render('breakdown/update_status',{breakDown:result[0]});
        }
    });


};