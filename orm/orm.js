/**
 * Created by prabod on 12/7/16.
 */

const mysql = require('mysql');
export default class orm{
    constructor(host, user, password, database) {
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        });
        this.connection.connect();
    }
    insert(model){
        let table = model.constructor.name;
        let values = [];
        for(let key in model){
            values.push(model[key].get())
        }
        this.connection.query(
            "INSERT INTO " + table +
            " VALUES " + "(" +
            values.join() +")"
        );
    }

    createTable(model){
    }
}
