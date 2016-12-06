/**
 * Created by prabod on 12/7/16.
 */

var mysql      = require('mysql');
function orm(host, user, password, database) {
    var connection = mysql.createConnection({
        host     : host,
        user     : user,
        password : password,
        database : database
    });

    connection.connect();
}



module.exports = orm;