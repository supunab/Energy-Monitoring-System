/**
 * Created by prabod on 12/7/16.
 */

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
            if (model[key].get() !== null) {
                keys.push(key);
                values.push("'" + model[key].get() + "'");
            }

        }
        console.log(values, keys);
        this.connection.query(
            "INSERT INTO " + table +
            "( " + keys.join() + " ) " +
            " VALUES " + "(" +
            values.join() + ")",
            callback);
    }

    findOne(model, param, callback) {
        let table = model.constructor.name;
        let vals = [];
        for (let key in param) {
            vals.push("'" + param[key] + "'");
        }
        console.log("SELECT " + Object.keys(model).join() + " from " + table +
            " WHERE " + "(" + Object.keys(param).join() + " )" + " = (" + vals.join() + ");");
        this.connection.query(
            "SELECT " + Object.keys(model).join() + " from " + table +
            " WHERE " + "(" + Object.keys(param).join() + " )" + " = (" + vals.join() + ");"
            , function (error, results, fields) {
                //onsole.log(error, results, fields);
                callback(error, results[0]);
            });
    }

    find(model, param, callback) {
        let table = model.constructor.name;
        let vals = [];
        for (let key in param) {
            vals.push("'" + param[key] + "'");
        }
        console.log("SELECT " + Object.keys(model).join() + " from " + table +
            " WHERE " + "(" + Object.keys(param).join() + " )" + " = (" + vals.join() + ");");
        this.connection.query(
            "SELECT " + Object.keys(model).join() + " from " + table +
            " WHERE " + "(" + Object.keys(param).join() + " )" + " = (" + vals.join() + ");"
            , function (error, results, fields) {
                callback(error, results);
            });
    }

    findById(model, id, callback) {
        let table = model.constructor.name;
        console.log("SELECT " + Object.keys(model).join() + " from " + table +
            " WHERE id = " + id + ";");
        console.log("this is id", id);
        this.connection.query(
            "SELECT " + Object.keys(model).join() + " from " + table +
            " WHERE id = " + id + ";"
            , function (error, results, fields) {
                callback(error, results[0]);
            });
    }

}
