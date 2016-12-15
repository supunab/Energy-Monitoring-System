const Models = require('./Model');
const Fields = require('./../orm/Fields');

export default class Complain extends Models{
    constructor(){
        super();
        this.id = new Fields.IntegerField(null,  true,null, true,true);
        this.title = new Fields.CharField(255,true);
        this.body = new Fields.TextField();
        this.comment = new Fields.TextField();
    }

}