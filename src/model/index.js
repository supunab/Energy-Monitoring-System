import User from '../model/User'
<<<<<<< ae7d5ecc990fa5d45e73665d4917edec0c09846d
import Complaint from '../model/Complaint'
import Area from '../model/Area'
import Test from '../model/Test'
=======
import Complain from '../model/Complain'
>>>>>>> done views

export default class Migrate {
    constructor() {
        this.user = new User().generateSchema();
        this.complaint = new Complaint().generateSchema();
        this.area = new Area().generateSchema();
        this.test = new Test().generateSchema();
    }
}
