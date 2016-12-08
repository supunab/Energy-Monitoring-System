/**
 * Created by prabod on 12/9/16.
 */
import * as ORM from '../orm/orm'
export class Model{

    insert(){
        let orm = new ORM();
        orm.insert(this);
    }

    findbyId(id){
        let orm = new ORM();
        let obj = orm.findbyId(this, id);
        return obj;
    }
}