import User from '../model/User'
import Complaint from '../model/Complaint'
import Area from '../model/Area'
import Test from '../model/Test'
import Bill from '../model/Bill'
import BillPayment from '../model/BillPayment'
import Connection from '../model/Connection'
import Customer from '../model/Customer'
import PowerCut from '../model/PowerCut'
import BreakDowns from '../model/Breakdown'

export default class Migrate {
    constructor() {
        this.user = new User().generateSchema();
        this.complaint = new Complaint().generateSchema();
        this.area = new Area().generateSchema();
        this.test = new Test().generateSchema();
        this.powerCut = new PowerCut().generateSchema();
        this.customer = new Customer().generateSchema();
        this.connection = new Connection().generateSchema();
        this.bill = new Bill().generateSchema();
        this.billPayment = new BillPayment().generateSchema();
        this.breakDowns = new BreakDowns().generateSchema();
    }
}
