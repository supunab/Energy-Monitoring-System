import orm from '../orm/orm'
import * as field from '../orm/Fields'
import db from '../../db.config'

let o = new orm(db.host, db.user, db.password, db.database);

export default class Model {
    constructor() {

    }

    save(callback) {
        o.insert(this, callback);
    }

    generateSchema() {
        let schema = 'CREATE TABLE ' + this.constructor.name + '(';
        let pk;
        let fk = [];
        let m2m = [];
        for (let entity in this) {

            let statement = entity;

            if (this[entity] instanceof field.IntegerField) {
                statement += ' INT';
                if (this[entity].maxLength !== null) {
                    statement += '(' + this[entity].maxLength + ')';
                }
                if (this[entity].required) {
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].ai && this[entity].pk) {
                    pk = entity;
                    statement += ' AUTO_INCREMENT';
                }
                if (this[entity].defaultVal !== null) {
                    statement += ' DEFAULT ' + this[entity].defaultVal;
                }
                statement += ',';
            }

            else if (this[entity] instanceof field.FloatField) {
                statement += ' FLOAT';
                if (this[entity].maxLength !== null) {
                    statement += '(' + this[entity].maxLength + ')';
                }
                if (this[entity].required) {
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].defaultVal !== null) {
                    statement += ' DEFAULT ' + this[entity].defaultVal;
                }
                statement += ',';
            }

            else if (this[entity] instanceof field.CharField) {
                statement += ' VARCHAR';
                if (this[entity].maxLength !== null) {
                    statement += '(' + this[entity].maxLength + ')';
                }
                if (this[entity].required) {
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].pk) {
                    pk = entity;
                }
                if (this[entity].defaultVal !== null) {
                    statement += ' DEFAULT ' + "`" + this[entity].defaultVal + "`";
                }
                statement += ',';
            }

            else if (this[entity] instanceof field.BooleanField) {
                statement += ' BOOLEAN';
                if (this[entity].required) {
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].defaultVal !== null) {
                    statement += ' DEFAULT ' + this[entity].defaultVal;
                }
                statement += ',';
            }

            else if (this[entity] instanceof field.DateField) {
                statement += ' DATE';
                if (this[entity].required) {
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].defaultVal !== null) {
                    statement += ' DEFAULT ' + this[entity].defaultVal;
                }
                statement += ',';
            }

            else if (this[entity] instanceof field.DateTimeField) {
                statement += ' DATETIME';
                if (this[entity].required) {
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].defaultVal !== null) {
                    statement += ' DEFAULT ' + this[entity].defaultVal;
                }
                statement += ',';
            }

            else if (this[entity] instanceof field.TimeStampField) {
                statement += ' TIMESTAMP';
                if (this[entity].required) {
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].defaultVal !== null) {
                    statement += ' DEFAULT ' + this[entity].defaultVal;
                }
                statement += ',';
            }

            else if (this[entity] instanceof field.TextField) {
                statement += ' TEXT';
                if (this[entity].required) {
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].defaultVal !== null) {
                    statement += ' DEFAULT ' + this[entity].defaultVal;
                }
                statement += ',';
            }

            else if (this[entity] instanceof field.ForeignKeyField) {
                statement += ' INT';
                if (this[entity].required) {
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].defaultVal !== null) {
                    statement += ' DEFAULT ' + this[entity].defaultVal;
                }
                statement += ',';
                let reference = ", FOREIGN KEY (" + entity + ") REFERENCES " + this[entity].getModel.call(this[entity]).name + "(" + this[entity].getPK().call(this[entity]) + ") ";
                fk.push(reference);
            }

            else if (this[entity] instanceof field.OneToOneField) {
                statement += ' INT UNIQUE';
                if (this[entity].required) {
                    statement += ' NOT NULL';
                }
                else {
                    statement += ' NULL';
                }
                if (this[entity].defaultVal !== null) {
                    statement += ' DEFAULT ' + this[entity].defaultVal;
                }
                statement += ',';
                let reference = ", FOREIGN KEY (" + entity + ") REFERENCES " + this[entity].getModel.call(this[entity]).name + "(" + this[entity].getPK().call(this[entity]) + ") ";
                fk.push(reference);
            }

            else if (this[entity] instanceof field.ManyToManyField) {
                statement = statement.substring(0, statement.length - entity.length);
                let foreignTable = this[entity].getModel.call(this[entity]).name;
                let foreignPK = this[entity].getPK().call(this[entity]);
                let thisTable = this.constructor.name;
                let thisPK = this.getPK();
                let reference = "CREATE TABLE " + foreignTable + "_m2m_" + thisTable +
                    "(" +
                    foreignTable + "_" + foreignPK + " INT NOT NULL, " +
                    thisTable + "_" + thisPK + " INT NOT NULL, " +
                    "FOREIGN KEY (" + foreignTable + "_" + foreignPK + ") REFERENCES " + foreignTable + "(" + foreignPK + ")," +
                    "FOREIGN KEY (" + thisTable + "_" + thisPK + ") REFERENCES " + thisTable + "(" + thisPK + ")" +
                    ")ENGINE=INNODB;";
                m2m.push(reference);
            }


            schema += statement;
        }
        if (pk !== undefined) {
            schema += 'PRIMARY KEY ( ' + pk + ' )';
        } else {
            schema = schema.substring(0, schema.length - 1);
        }

        for (let index = 0; index < fk.length; ++index) {
            schema += fk[index];
        }
        schema += ')ENGINE=INNODB;';

        for (let index = 0; index < m2m.length; ++index) {
            schema += '\n' + m2m[index];
        }
        return schema;
    }

    static findOne(param, callback) {
        o.findOne(new this(), param, callback);
    }

    static findById(id, callback) {
        o.findById(new this(), id, callback);
    }

    static find(param, callback) {
        o.find(new this(), param, callback);
    }

    fromDB(model) {
        for (let key in this) {
            this[key].set(model[key]);
        }
    }

}