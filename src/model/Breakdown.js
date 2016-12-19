import * as field from '../orm/Fields'
import Model from '../model/Model'
import User from '../model/User'
import Area from '../model/Area'


export default class Breakdown extends Model {
    constructor(){
        super();
        this.id=new field.IntegerField(null, true, null, true, true);
        this.userId = new field.ForeignKeyField(User);
        this.area = new field.ForeignKeyField(Area);
        this.description=new field.CharField(255);
        this.status=new field.CharField(255);
        this.finished=new field.BooleanField(true,false);
        this.created_at = new field.DateTimeField(true, "CURRENT_TIMESTAMP");
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