const mysql = require('mysql');
const dbConfig = require('../../db.config');

exports.execQuery = function (sql, param, cb) {
    mysql.createPool({
        connectionLimit: 10,
        host: dbConfig.module.host,
        user: dbConfig.module.user,
        password: dbConfig.module.password,
        database: dbConfig.module.database
    }).query(sql, param,cb);
};
