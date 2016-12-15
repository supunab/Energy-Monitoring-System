require("babel-register");
import Migrate from './model/index'
const mysql = require('mysql');
import db from './db.config.js'
let connection = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

connection.connect();

let migrate = new Migrate();
let sql = '';
for (let model in migrate) {
    sql += migrate[model] + '\n';
}
let fs = require('fs');
var path = require('path');

let filePath = path.join(__dirname, '../migrations', 'tables.sql');
fs.writeFile(filePath, sql, {flag: 'w'}, function (err) {
    if (err) throw err;
    console.log("It's saved on /migrations/tables.sql");

});

connection.query(sql,
    function (error, results, fields) {
        //console.log(error, results, fields);
        if (error == null) {
            console.log("Created tables " + Object.keys(migrate).join());
        }
        else {
            console.log(error);
        }

        connection.destroy();
    });
