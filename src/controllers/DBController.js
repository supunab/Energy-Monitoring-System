const mysql = require('mysql');
const dbConfig = require('../../db.config');

exports.execQuery = function (sql, param, cb) {
    mysql.createPool({
        connectionLimit: 10,
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database
    }).query(sql, param,cb);
};
