import PowerCut from "../model/PowerCut"
import Area from "../model/Area"
import DB from '../controllers/DBController'
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
    let timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    startDate = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
    endDate = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate();
    let groupBy = "DAY";
    if (diffDays > 30 && diffDays < 30 * 18) {
        groupBy = "MONTH";
    }
    else if (diffDays > 30 * 18) {
        groupBy = "YEAR";
    }

    let consumptionSQL = "SELECT SUM(reading) AS consumption, " + groupBy + "(Bill.ending_date) AS " + groupBy + " from (Bill LEFT JOIN Connection ON Connection.id = Bill.connection_id) LEFT JOIN Area ON Connection.area_id = Area.id" +
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

    consumptionSQL += " GROUP BY " + groupBy + "(Bill.ending_date);";
    let response = {};
    DB.execQuery(consumptionSQL, function (err, result) {
        console.log(result);
        let labels = [];
        let data = [];
        _.each(result, function (row) {
            labels.push(row.MONTH);
            data.push(row.consumption);
        });
        console.log(labels, data);
        response["labels"] = labels;
        response["data"] = data;
        res.status(200).jsonp(response);
    });
    //console.log(req.query,consumptionSQL);
};

