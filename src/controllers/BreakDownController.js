import Breakdown from '../model/Breakdown';

exports.getRequest = function (req,res) {
    Breakdown.find({}, {limit: 10}, function (err, result) {
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
    let date=new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    var weekday=new Array(7);
    weekday[1]="Monday";
    weekday[2]="Tuesday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6]="Saturday";
    weekday[0]="Sunday";
    let day= weekday[date.getDay()];
    let hour=date.getHours();
    let minute=date.getMinutes();
    let dwant = day + "-" + month + "-" + year + "  " + hour + ":" + minute;
    newBreakdown.createObject(userId,area,description,null,finished,dwant);
    newBreakdown.save(function (err,result) {
        if(err)
            throw err;
        res.redirect('/breakdownreport');
    });
};