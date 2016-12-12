import orm from '../orm/orm'
import * as field from '../orm/Fields'

export default class Model{
    constructor(){

    }

    save(callback) {
        let o = new orm('localhost', 'root', 'root', 'university');
        o.insert(this, callback);
    }
    generateSchema(){
        let schema = 'CREATE TABLE ' + this.constructor.name + ' (';
        let pk ;
        for (let entity in this){

            let statement = entity ;

            if( this[entity] instanceof field.IntegerField){
                statement += ' int';
                if (this[entity].maxLength !== null){
                    statement += '(' + this[entity].maxLength + ')';
                }
                if (this[entity].required){
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].ai && this[entity].pk){
                    pk = entity;
                    statement += ' AUTO_INCREMENT';
                }
                if (this[entity].defaultVal !== null){
                    statement += ' DEFAULT ' + this[entity].defaultVal;
                }
            }

            else if( this[entity] instanceof field.FloatField){
                statement += ' float';
                if (this[entity].maxLength !== null){
                    statement += '(' + this[entity].maxLength + ')';
                }
                if (this[entity].required){
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].defaultVal !== null){
                    statement += ' DEFAULT ' + this[entity].defaultVal;
                }
            }

            else if( this[entity] instanceof field.CharField){
                statement += ' VARCHAR';
                if (this[entity].maxLength !== null){
                    statement += '(' + this[entity].maxLength + ')';
                }
                if (this[entity].required){
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].pk){
                    pk = entity;
                }
                if (this[entity].defaultVal !== null){
                    statement += ' DEFAULT ' + "`" + this[entity].defaultVal + "`";
                }
            }

            else if( this[entity] instanceof field.BooleanField){
                statement += ' boolean';
                if (this[entity].required){
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].defaultVal !== null){
                    statement += ' DEFAULT ' + this[entity].defaultVal;
                }
            }
            statement += ',';
            schema += statement;
        }
        if (pk !== undefined){
            schema += 'PRIMARY KEY ( ' + pk + ' )';
            schema += ');'
        }else {
            schema = schema.substring(0,schema.length-1);
            schema += ');'
        }

        return schema;
    }

    static findOne(param, callback) {
        let o = new orm('localhost', 'root', 'root', 'university');
        o.findOne(new this(), param, callback);
    }

    static findById(id, callback) {
        let o = new orm('localhost', 'root', 'root', 'university');
        o.findById(new this(), id, callback);
    }

    static find(id, callback) {
        let o = new orm('localhost', 'root', 'root', 'university');
        o.find(new this(), id, callback);
    }

    fromDB(model) {
        for (let key in this) {
            this[key].set(model[key]);
        }
    }

}