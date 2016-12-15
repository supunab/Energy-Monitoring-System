import User from '../model/User'
import Complain from '../model/Complain'

export default class Migrate {
    constructor() {
        this.user = new User().generateSchema();
        this.complain = new Complain().generateSchema();
    }
}
