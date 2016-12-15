/**
 * Created by prabod on 12/7/16.
 */
import * as field from '../orm/Fields'
import Model from '../model/Model'
var bcrypt = require('bcrypt-nodejs');

export default class User extends Model {
    constructor() {
        super();
        this.id = new field.IntegerField(null, true, null, true, true);
        this.first_name = new field.CharField(30);
        this.last_name = new field.CharField(50, false);
        this.user_name = new field.CharField(20);
        this.email = new field.CharField(40);
        this.password = new field.CharField(100);
        this.is_admin = new field.BooleanField(true, false);

    }

    createObject(first_name, last_name, user_name, password, is_admin) {
        this.first_name.set(first_name);
        this.last_name.set(last_name);
        this.user_name.set(user_name);
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