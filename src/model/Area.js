/**
 * Created by prabod on 12/16/16.
 */
import * as field from '../orm/Fields'
import Model from '../model/Model'

export default class Area extends Model {
    constructor() {
        super();
        this.id = new field.IntegerField(null, true, null, true, true);
        this.name = new field.CharField(50);

    }

    createObject(id, name) {
        this.id.set(id);
        this.name.set(name);
    }

    getPK() {
        return 'id';
    }
}