const DB = require('./DBController');

exports.getIndex = function (req, res) {
    let sql = "SELECT * "+
            "FROM User u "+
            "INNER JOIN Customer c "+
            "ON u.customer_id = c.id "+
            "INNER JOIN Connection con "+
            "ON con.customer_id = c.id "+
            "INNER JOIN (SELECT apc.area_id, pc.starting_date, pc.ending_date, pc.description "+
                "FROM Area a "+
                "INNER JOIN Area_m2m_PowerCut apc "+
                "ON a.id = apc.Area_id "+
                "INNER JOIN PowerCut pc "+
                "ON apc.PowerCut_id = pc.id) a "+
            "ON a.area_id = con.area_id " +
            "WHERE u.id = ?";
    DB.execQuery(sql, [req.user.id.int], function (err, pc) {
        if(err){
            console.log(err);
        }else{
            console.log(pc);
            // TODO call the function
            res.render('user-dashboard', {powercuts: pc});
        }
    });
}

exports.errorPage404 = function (req, res) {
    res.render('pageNotAvailable');
}

exports.errorPage401 = function (req, res) {
    res.render('unAuthenticatePage');
}

