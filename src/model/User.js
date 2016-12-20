/**
 * Created by prabod on 12/7/16.
 */
import * as field from '../orm/Fields'
import Model from '../model/Model'
import Customer from '../model/Customer'
var bcrypt = require('bcrypt-nodejs');

export default class User extends Model {
    constructor() {
        super();
        this.id = new field.IntegerField(null, true, null, true, true);
        this.email = new field.CharField(40);
        this.password = new field.CharField(100);
        this.customer_id = new field.ForeignKeyField(Customer);
        this.is_admin = new field.BooleanField(true, false);

    }

    createObject(email, password, is_admin) {
        this.email.set(email);
        this.password.set(this.generateHash(password));
        this.is_admin.set(is_admin);
    }

    static generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }

    validPassword(password) {
        return bcrypt.compareSync(password, this.password.get());
    }

    getPK() {
        return 'id';
    }
}