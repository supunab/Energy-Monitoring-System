import BillPayment from '../model/BillPayment'
exports.postPayment= function (req,res) {
    let billId=parseInt(req.body.bill_id);
    let amount=parseInt(req.body.amount);
    let nameOnCard=req.body.name_on_card;
    let password=req.body.password;
    let postalCode=req.body.postal_code;
    let day=new Date();
    (function() {
        Date.prototype.toYMD = Date_toYMD;
        function Date_toYMD() {
            var year, month, day;
            year = String(this.getFullYear());
            month = String(this.getMonth() + 1);
            if (month.length == 1) {
                month = "0" + month;
            }
            day = String(this.getDate());
            if (day.length == 1) {
                day = "0" + day;
            }
            return year + "-" + month + "-" + day;
        }
    })();
    let date=day.toYMD();
    console.log(date);
    BillPayment.findOne({'bill_id':billId},function (err,payment) {
        if(err) {
            console.log("error occurred!");
            res.render('addPayments', {error: "Error occurred. Please resubmit Payments"});
        }
        if(payment) {
            res.render('addPayments', {error: "You have already added payments for that bill number!"});
        }else{
            let billPayment=new BillPayment();
            billPayment.createObject(amount,billId,date);
            billPayment.save(function (err,result) {
                if(err)
                    throw err;
                res.render('addPayments',{error:"Successfully recorded the payment"});
            });
        }

    });
}
exports.getPaymentPage=function (req,res) {
    res.render('addPayments');
}