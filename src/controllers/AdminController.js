import PowerCut from "../model/PowerCut"
import Area from "../model/Area"
import DB from '../controllers/DBController'
import Connection from '../model/Connection'

const _ = require("underscore");
exports.addPowerCut = function(req, res, next){
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let description = req.body.description;
    let area_names = req.body.areas;
    let areas = [];

    for(let i=0; i<area_names.length; i++){
        Area.find({name: area_names[i]}, {}, function (err, result) {
            areas.push(result[0].id);
            if(i===area_names.length-1){
                // After all the area_ids are taken
                let powerCut = new PowerCut();
                powerCut.createObject(start_date, end_date, description, areas);

                powerCut.save(function(err){
                    if (err){
                        console.log("Save Error : "+err);
                    }
                })
            }
        });
    }
};

exports.powerConsumption = function (req, res) {
    let area = req.query.area;
    let connectionType = req.query.connectionType;
    let dateRange = req.query.dateRange;
    let dates = dateRange.split('-');
    let startDate = new Date(dates[0]);
    let endDate = new Date(dates[1]);
    let sD = startDate.toLocaleString('en-us', {month: "long"}) + " " + startDate.getFullYear();
    let eD = endDate.toLocaleString('en-us', {month: "long"}) + " " + endDate.getFullYear();
    let chartLabels = diff(sD, eD);
    console.log(chartLabels);
    let timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    startDate = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
    endDate = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate();
    let groupBy = "MONTH";

    let consumptionSQL = "SELECT SUM(reading) AS consumption, DATE_FORMAT(Bill.ending_date,'%M %Y') AS MONTH , SUM(Bill.amount) AS EXPECTED_INCOME,sum(BillPayment.amount) AS INCOME from ((Bill LEFT JOIN Connection ON Connection.id = Bill.connection_id) LEFT JOIN Area ON Connection.area_id = Area.id) LEFT JOIN BillPayment on Bill.id = BillPayment.bill_id " +
        " WHERE (Bill.ending_date BETWEEN '" +
        startDate + "' AND '" + endDate + "')";
    if (!_.contains(area, 'All Areas') || (_.contains(area, "All Areas") && area.length !== 1)) {
        consumptionSQL += " AND ( Area.name  IN (";
        _.each(area, function (item) {
            if (item != 'All Areas') {
                consumptionSQL += "'" + item + "',";
            }
        });
        consumptionSQL = consumptionSQL.substring(0, consumptionSQL.length - 1);
        consumptionSQL += "))";
    }
    if (!_.contains(connectionType, "All Connections") || (_.contains(connectionType, "All Connections") && connectionType.length !== 1)) {
        consumptionSQL += " AND ( Connection.connection_type  IN (";
        _.each(area, function (item) {
            if (item != 'All Connections') {
                consumptionSQL += "'" + item + "',";
            }
        });
        consumptionSQL = consumptionSQL.substring(0, consumptionSQL.length - 1);
        consumptionSQL += "))";
    }

    consumptionSQL += " GROUP BY DATE_FORMAT(Bill.ending_date,'%M %Y') ORDER BY DATE_FORMAT(Bill.ending_date,'%M %Y') DESC;";
    console.log(consumptionSQL);
    let response = {};
    DB.execQuery(consumptionSQL, function (err, result) {
        let labels = [];
        let data = [];
        let expected = [];
        let income = [];
        _.each(chartLabels, function (lbl) {
            let obj = _.findWhere(result, {MONTH: lbl});
            if (obj !== undefined) {
                labels.push(obj.MONTH);
                data.push(obj.consumption);
                expected.push(obj.EXPECTED_INCOME);
                income.push(obj.INCOME);
            }
            else {
                labels.push(lbl);
                data.push(0);
                expected.push(0);
                income.push(0);
            }
        });
        response["labels"] = labels;
        response["data"] = data;
        response["expected"] = expected;
        response["income"] = income;

        res.status(200).jsonp(response);
    });
};

var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

function diff(from, to) {
    var arr = [];
    var datFrom = new Date('1 ' + from);
    var datTo = new Date('1 ' + to);
    var fromYear = datFrom.getFullYear();
    var toYear = datTo.getFullYear();
    var diffYear = (12 * (toYear - fromYear)) + datTo.getMonth();

    for (var i = datFrom.getMonth(); i <= diffYear; i++) {
        arr.push(monthNames[i % 12] + " " + Math.floor(fromYear + (i / 12)));
    }

    return arr;
}


exports.addNewConnection = function(req, res, next){
    let connection = new Connection();
    connection.createObject(req.body.account_no, req.body.address1, req.body.address2, req.body.addressStreet, req.body.city, req.body.district, req.body.connection_type, "")

};

