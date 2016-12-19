import * as field from '../orm/Fields'
import Model from '../model/Model'
import User from '../model/User'
var bcrypt = require('bcrypt-nodejs');

export default class Breakdown extends Model {
    constructor(){
        super();
        this.id=new field.IntegerField(null, true, null, true, true);
        this.user_id = new field.ForeignKeyField(User);
        this.dateTime = new field.DateTimeField(true, null);
        this.area =new field.CharField(50);
        this.description=new field.CharField(255);
        this.status=new field.CharField(255);
        this.finished=new field.BooleanField(true,false);
    }
    createObject(userId,area,description,status,finished,date){
        this.area.set(area);
        this.dateTime.set(date);
        this.user_id.set(userId);
        this.description.set(description);
        this.status.set(status);
        this.finished.set(finished);
    }
}