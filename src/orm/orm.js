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
        this.connection.query(
            "INSERT INTO " + table +
            "( " + keys.join() + " ) " +
            " VALUES " + "(" +
            values.join() + ")",
            callback);
    }

    insertObject(table, columns, values, callback) {
        let val = '';
        for (let i = 0; i < values.length; i++) {
            val += '(' + values[i].join() + "),"
        }
        val = val.substring(0, val.length - 1);
        this.connection.query(
            "INSERT INTO " + table +
            "( " + columns.join() + " ) " +
            " VALUES " + val,
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
                if (error){
                    console.log(error);
                }else{
                    callback(error, results[0]);
                }
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
        if (Object.keys(param).length === 0 && Object.keys(param)[0]!== "size") {
            console.log("Executed Query: "+"SELECT " + Object.keys(model).join() + " from " + table + ";");
            this.connection.query(
                "SELECT " + Object.keys(model).join() + " from " + table + ";"
                , function (error, results, fields) {
                    callback(error, results);
                });
        }else if(Object.keys(param)[0]=== "size"){
            console.log("Executed Query: "+"SELECT " + Object.keys(model).join() + " from " + table +" ORDER BY id DESC LIMIT "+ param['size'] +";");
            this.connection.query("SELECT "+Object.keys(model).join() + " from " + table + " ORDER BY id DESC LIMIT "+ param['size'] +";"
                , function (error,results,fields) {
                    callback(error,results);
                });
        }
        else {
            this.connection.query(
                "SELECT " + Object.keys(model).join() + " from " + table +
                " WHERE " + "(" + Object.keys(param).join() + " )" + " = (" + vals.join() + ");"
                , function (error, results, fields) {
                    callback(error, results);
                });
        }
    }

    findById(model, id, callback) {
        let table = model.constructor.name;
        console.log("SELECT " + Object.keys(model).join() + " from " + table +
            " WHERE id = " + id + ";");
        console.log("this is id", id);
        this.connection.query(
            "SELECT " + Object.keys(model).join() + " from " + table +
            " WHERE id = " + id + ";"
            , function (error, results, fields){
                callback(error, results[0]);
            });
    }

}
