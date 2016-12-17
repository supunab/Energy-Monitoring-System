import * as field from '../orm/Fields'
import Model from '../model/Model'
import Area from '../model/Area'

export default class PowerCut extends Model{
    constructor(){
        super();
        this.id = new field.IntegerField(null, true, null, true, true);
        this.areas = new field.ManyToManyField(Area, true, null);
        this.starting_date = new field.DateTimeField(true, null);
        this.ending_date = new field.DateTimeField(true, null);
        this.description = new field.CharField(45);
    }

    createObject(start_date, end_date, description, areas){
        this.starting_date.set(start_date);
        this.ending_date.set(end_date);
        this.description.set(description);
        this.areas.set(areas);
    }

    getPK(){
        return "id";
    }
}