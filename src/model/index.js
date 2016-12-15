import User from '../model/User'
import Complaint from '../model/Complaint'
import Area from '../model/Area'
import Test from '../model/Test'

export default class Migrate {
    constructor() {
        this.user = new User().generateSchema();
        this.complaint = new Complaint().generateSchema();
        this.area = new Area().generateSchema();
        this.test = new Test().generateSchema();
    }
}
