import User from '../model/User'
import Complaint from '../model/Complaint'

export default class Migrate {
    constructor() {
        this.user = new User().generateSchema();
        this.complaint = new Complaint().generateSchema();
    }
}
