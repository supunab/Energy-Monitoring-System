import Breakdowns from '../model/Breakdowns';

exports.getRequest = function (req,res) {

    Breakdowns.find({});
};

exports.postRequest = function (req, res) {

}