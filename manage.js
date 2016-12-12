import Migrate from './model/index'

let migrate = new Migrate();
let sql = '';
for (let model in migrate) {
    sql += migrate[model] + '\n';
}
let fs = require('fs');
var path = require('path');

let filePath = path.join(__dirname, '../migrations', 'tables.sql');
fs.writeFile(filePath, sql, {flag: 'wx'}, function (err) {
    if (err) throw err;
    console.log("It's saved!");
});