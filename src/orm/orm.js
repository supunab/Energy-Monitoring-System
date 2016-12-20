/**
 * Created by prabod on 12/7/16.
 */
import * as field from '../orm/Fields'
const mysql = require('mysql');
export default class orm {
    constructor(host, user, password, database) {
        this.connection = mysql.createPool({
            connectionLimit: 10,
            host: host,
            user: user,
            password: password,
            database: database
        });
        //this.connection.connect();
    }


    insert(model, callback) {
        let table = model.constructor.name;
        let values = [];
        let keys = [];
        for (let key in model) {
            if (model[key].get() !== null && !(model[key] instanceof field.ManyToManyField)) {
                keys.push(key);
                values.push("'" + model[key].get() + "'");
            }

        }
        console.log(values, keys);
        let sql = "INSERT INTO " + table +
            "( " + keys.join() + " ) " +
            " VALUES " + "(" +
            values.join() + ")";
        this.connection.query(
            sql,
            callback);
    }

    insertObject(table, columns, values, callback) {
        let val = '';
        for (let i = 0; i < values.length; i++) {
            val += '(' + values[i].join() + "),"
        }
        val = val.substring(0, val.length - 1);
        let sql = "INSERT INTO " + table +
            "( " + columns.join() + " ) " +
            " VALUES " + val;
        // sql = this.connection.escape(sql);
        console.log(sql);
        this.connection.query(
            sql,
            callback);
    }

    findOne(model, param, callback) {
        let table = model.constructor.name;
        let vals = [];
        for (let key in param) {
            vals.push("'" + param[key] + "'");
        }
        let sql = "SELECT " + Object.keys(model).join() + " from " + table +
            " WHERE " + "(" + Object.keys(param).join() + " )" + " = (" + vals.join() + ");";
        console.log(sql);
        this.connection.query(
            sql,
            function (error, results, fields) {
                //onsole.log(error, results, fields);
                if (error) {
                    console.log(error);
                } else {
                    callback(error, results[0]);
                }
            });
    }

    find(model, param, options, callback) {
        let table = model.constructor.name;
        let vals = [];
        for (let key in param) {
            vals.push("'" + param[key] + "'");
        }

        if (Object.keys(param).length === 0) {
            let sql = "SELECT " + Object.keys(model).join() + " from " + table;

            if (options["orderby"] !== undefined) {
                sql += " ORDER BY " + options["orderby"];

                if (options["order"] !== undefined) {
                    sql += " " + options["order"];
                }
            }
            if (options["limit"] !== undefined && isNumeric(options["limit"])) {
                sql += " LIMIT " + options["limit"];
            }

            sql += ";";
            this.connection.query(
                sql
                , function (error, results, fields) {
                    callback(error, results);
                });
        }
        else {
            let sql = "SELECT " + Object.keys(model).join() + " from " + table +
                " WHERE " + "(" + Object.keys(param).join() + " )" + " = (" + vals.join() + ")";

            if (options["limit"] !== undefined && isNumeric(options["limit"])) {
                sql += " LIMIT " + options["limit"];
            }

            if (options["orderby"] !== undefined) {
                sql += " ORDER BY " + options["orderby"];

                if (options["order"] !== undefined) {
                    sql += " " + options["order"];
                }
            }
            sql += ";";
            this.connection.query(
                sql
                , function (error, results, fields) {
                    callback(error, results);
                });
        }
    }

    findById(model, id, callback) {
        let table = model.constructor.name;
        let sql = "SELECT " + Object.keys(model).join() + " from " + table +
            " WHERE id = " + id + ";";
        //console.log(sql);
        this.connection.query(
            sql,
            function (error, results, fields) {
                callback(error, results[0]);
            });
    }

}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}