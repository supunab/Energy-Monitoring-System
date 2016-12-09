/**
 * Created by prabod on 12/7/16.
 */
import * as field from '../orm/Fields'
import Model from '../model/Model'

export default class User extends Model{
    constructor(){
        super();
        this.first_name = new field.CharField(30,true,null,true);
        this.last_name = new field.CharField(50,false);
        this.user_name = new field.CharField(20);
        this.password = new field.CharField(30);
        this.is_admin = new field.BooleanField(false);

    }
    createObject(first_name, last_name, user_name, password,is_admin){
        this.first_name.set(first_name);
        this.last_name.set(last_name);
        this.user_name.set(user_name);
        this.password.set(password);
        this.is_admin.set(is_admin);
    }
}