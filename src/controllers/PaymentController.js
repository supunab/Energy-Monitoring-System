import '/src/model/BillPayment'
exports.postPayment= function (req,res) {
    let billId=req.body.bill_id;
    let amount=parseInt(req.body.amount);
    let nameOnCard=req.body.name_on_card;
    let password=req.body.password;
    let postlaCode=req.body.postal_code;
}