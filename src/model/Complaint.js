/**
 * Created by prabod on 12/15/16.
 */
import * as field from '../orm/Fields'
import Model from '../model/Model'
import User from '../model/User'

export default class Complaint extends Model {
    constructor() {
        super();
        this.id = new field.IntegerField(null, true, null, true, true);
        this.user_id = new field.ForeignKeyField(User);
        this.title = new field.CharField(200, true,);
        this.description = new field.TextField(true);
        this.comment = new field.TextField(true);
        this.comp_type = new field.CharField(20, true);
    }

    createObject(id, user_id, title, description, type) {
        this.id.set(id);
        this.user_id.set(user_id);
        this.title.set(title);
        this.description.set(description);
        this.type.set(type)
    }

    getPK() {
        return 'id';
    }
}