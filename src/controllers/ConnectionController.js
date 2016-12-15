import ConnectionRequest from '../model/ConnectionRequest'

exports.getRequest = function (req, res) {
    res.render("connection/request");
};

exports.postRequest = function (req, res) {
    console.log("Came to Post request");
    let newConnectionRequest= new ConnectionRequest();
    let userId=req.user.getPK().int;
    console.log(userId);
    let name = req.body.name;
    let telephone = req.body.tpNumber;
    let address1=req.body.address1;
    let address2 =req.body.address2;
    let street = req.body.street;
    let city=req.body.city;
    let district=req.body.district;
    newConnectionRequest.createObject(userId,telephone,address1,address2,street,city,district);
    newConnectionRequest.save(function (err,result) {
        if(err)
            throw err;
        res.redirect('/connectionRequest');
    });
};