import * as field from "../orm/Fields"
import Model from "../model/Model"
import Connection form "../model/Connection"

export default class Bill extends Model{
    constructor(){
        this.id = new field.IntegerField(null, true, null, true, true);
        this.connection_id = new field.ForeignKeyField(Connection, true, null);
        this.starting_date = new field.DateField(true, null);
        this.ending_date = new field.DateField(true, null);
        this.read = new field.FloatField(false, true, null, false);
        this.amount = new field.FloatField(false, true, null, false);
    }


    createObject(connection_id, starting_date, ending_date, read, amount){
        this.connection_id.set(connetion_id);
        this.starting_date.set(starting_date);
        this.ending_date.set(ending_date);
        this.read.set(read);
        this.amount.set(amount);
    }

    getPK(){
        return "id";
    }


}