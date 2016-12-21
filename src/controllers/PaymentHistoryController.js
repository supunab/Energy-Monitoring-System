import DB from "../controllers/DBController"

exports.getConnections = function(req, res, next){
    console.log("SELECT Customer.id,account_no FROM Customer JOIN Connection on Customer.id=Connection.customer_id HAVING id="+req.params.customer);
    DB.execQuery("SELECT Customer.id,account_no FROM Customer JOIN Connection on Customer.id=Connection.customer_id HAVING id=?;", req.params.customer,function(err, result){
        if (err){
            console.log(err);
            return next(err);
        }
        res.json(result);
    });
};


exports.renderPage = function(req, res){
    res.render('registeredUser/paymentHistory', {needAngular: " true"});
};


exports.getPaymentHistory = function(req, res, next){
    let qry = "SELECT connection.account_no as account_no, bill_p.pay_date, bill_p.amount from connection join (select pay_date, billpayment.amount, connection_id from billpayment left JOIN bill on (billpayment.bill_id=bill.id)) as bill_p on (bill_p.connection_id = connection.id) having ";

    let data = JSON.parse(decodeURIComponent(req.params.data));

    let fromDate = data.start_date;
    let toDate = data.end_date;

    qry += " pay_date>'"+fromDate+"' and pay_date<'"+toDate+"' and (";

    for(let i=0; i<data.connections.length-1; i++){
        qry += " account_no=? or ";
    }

    if(data.connections.length===1 && data.connections[0]==="true"){
        qry += "true or ";
    }

    qry += "account_no=?);";

    // For testing purposes
    console.log(qry);

    DB.execQuery(qry, data.connections, function(err, data){
        if (err){
            console.log(err);
            return next(err);
        }
        res.jsonp(data);
    });
};


exports.renderOtherView = function(req, res, next){
    res.render("paymentHistoryOther", {needAngular: " true"});
};

exports.checkConnectionId = function(req, res, next){
    DB.execQuery("SELECT account_no FROM connection WHERE account_no=?", req.params.connectionID, function(err, data){
        if (err){
            console.log(err);
            return next(err);
        }

        if (data.length == 0){
            res.jsonp({available : false});
        }else{
            res.jsonp({available : true});
        }

    });
};