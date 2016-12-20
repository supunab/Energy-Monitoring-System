import * as field from '../orm/Fields'
import Model from '../model/Model'

export default class Customer extends Model{
    constructor(){
        super();
        this.id = new field.IntegerField(9, true, null, true, false);
        this.email = new field.CharField(100, true, null, false);
        this.name = new field.CharField(100, true, null, false);
    }

    createObject(id, email, name){
        this.id.set(id);
        this.email.set(email);
        this.name.set(name);
    }

    getPK(){
        return "id";
    }
}