/**
 * Created by prabod on 12/7/16.
 */


var Schema = function Schema(fields) {
    this.fields = fields;
};

Schema.prototype.set = function (key, value) {
    this.fields[key] = value;
};

module.exports = Schema;