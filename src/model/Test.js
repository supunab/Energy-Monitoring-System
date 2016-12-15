/**
 * Created by prabod on 12/16/16.
 */
import * as field from '../orm/Fields'
import Model from '../model/Model'
import Area from '../model/Area'

export default class Test extends Model {
    constructor() {
        super();
        this.id = new field.IntegerField(null, true, null, true, true);
        this.name = new field.CharField(50);
        this.area = new field.ManyToManyField(Area)

    }

    createObject(id, name, area) {
        this.id.set(id);
        this.name.set(name);
        this.area.set(area)
    }

    getPK() {
        return 'id';
    }
}