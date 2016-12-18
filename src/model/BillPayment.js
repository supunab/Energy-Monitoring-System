import * as field from "../orm/Field"
import Model from "../model/Model"
import Bill from "../model/Bill"


export default class BillPayment extends Model{
    constructor(){
        super();
        this.amount = new field.FloatField(null, true, null, false);
        this.bill_id = new field.ForeignKeyField(Bill, true, null);
        this.pay_date = new field.DateField(true, null);
    }

    createObject(amount, bill_id, pay_date){
        this.amount.set(amount);
        this.bill_id.set(bill_id);
        this.pay_date.set(pay_date);
    }
}