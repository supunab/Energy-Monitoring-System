import * as field from '../orm/Fields'
import Model from '../model/Model'
import User from '../model/User'

export default class ConnectionRequest extends Model {
    constructor(){
        super();
        this.id = new field.IntegerField(null, true, null, true, true);
        this.userId = new field.ForeignKeyField(User);
        this.telephone=new field.CharField(12);
        this.status= new field.CharField(50);
        this.address1= new field.CharField(30);
        this.address2= new field.CharField(30);
        this.street= new field.CharField(30);
        this.city= new field.CharField(30);
        this.district= new field.CharField(30);
        this.created_at = new field.DateTimeField(true, "CURRENT_TIMESTAMP");
    }
    createObject(userId,telNmber,status,address1,address2,street,city,district){
        this.userId.set(userId);
        this.telephone.set(telNmber);
        this.status.set(status);
        this.address1.set(address1);
        this.address2.set(address2);
        this.street.set(street);
        this.city.set(city);
        this.district.set(district);
    }
    getPK() {
        return this.id;
    }
}