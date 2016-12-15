'use strict';

var _index = require('./model/index');

var _index2 = _interopRequireDefault(_index);

var _dbConfig = require('./db.config.js');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

require("babel-register");

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: _dbConfig2.default.host,
    user: _dbConfig2.default.user,
    password: _dbConfig2.default.password,
    database: _dbConfig2.default.database
});

connection.connect();

var migrate = new _index2.default();
var sql = '';
for (var model in migrate) {
    sql += migrate[model] + '\n';
}
var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, '../migrations', 'tables.sql');
fs.writeFile(filePath, sql, {flag: 'w'}, function (err) {
    if (err) throw err;
    console.log("It's saved on /migrations/tables.sql");
});

connection.query(sql, function (error, results, fields) {
    //console.log(error, results, fields);
    if (error == null) {
        console.log("Created tables " + Object.keys(migrate).join());
    } else {
        console.log(error);
    }

    connection.destroy();
});
//# sourceMappingURL=manage.js.map