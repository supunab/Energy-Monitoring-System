import User from '../model/User'
import Complaint from '../model/Complaint'
import Area from '../model/Area'
import Test from '../model/Test'

export default class Migrate {
    constructor() {
        this.user = new User().generateSchema(); console.log("user");
        this.test = new Test().generateSchema(); console.log("test");
        this.area = new Area().generateSchema(); console.log("area");
        this.complaint = new Complaint().generateSchema(); console.log("complaint");
    }
}
