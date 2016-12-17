import Breakdown from '../model/Breakdown';

exports.getRequest = function (req,res) {
    Breakdown.find({"''" :''},function (err,result) {
        if(err)
            throw err;
        if(result.size!=0){

            res.render('viewBreakDowns',{array : result});
        }
    });
};

exports.postRequest = function (req, res) {

}