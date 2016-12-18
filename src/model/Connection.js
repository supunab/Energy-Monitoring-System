import * as field from '../orm/Fields'
import Model from '../model/Model'
import Customer from '../model/Customer'
import Area from '../model/Area'

export default class Connection extends Model{
    constructor(){
        super();
        this.id = new field.IntegerField(null, true, null, true, true);
        this.account_no = new field.IntegerField(null, true, null, false, false);
        this.address_line1 = new field.CharField(30, true, null, false);
        this.address_line2 = new field.CharField(30, false, null, false);
        this.address_street = new field.CharField(45, true, null, false);
        this.address_city = new field.CharField(30, true, null, false);
        this.address_district = new field.CharField(30, true, null, false);
        this.connection_type = new field.CharField(30, true, null, false);
        this.customer_id = new field.ForeignKeyField(Customer, null, true);
        this.area_id = new field.ForeignKeyField(Area, null, true);
    }


    createObject(account_no, address_line1, address_line2, address_street, adress_city, address_district, connection_type, customer_id, area_id){
        this.account_no.set(account_no);
        this.address_line1.set(address_line1);
        this.address_line2.set(address_line2);
        this.address_street.set(address_street);
        this.address_city.set(address_city);
        this.address_district.set(address_district);
        this.connection_type.set(connection_type);
        this.customer_id.set(customer_id);
        this.area_id.set(area_id);
    }

    getPK(){
        return "id";
    }

}