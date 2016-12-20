import * as field from '../orm/Fields'
import Model from '../model/Model'

export default class Customer extends Model{
    constructor(){
        super();
        this.id = new field.IntegerField(9, true, null, true, false);
        this.first_name = new field.CharField(30);
        this.last_name = new field.CharField(50, false);
    }

    createObject(id, first_name, last_name) {
        this.id.set(id);
        this.first_name.set(first_name);
        this.last_name.set(last_name);
    }

    getPK(){
        return "id";
    }
}