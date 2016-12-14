import User from '../model/User'

export default class Migrate {
    constructor() {
        this.user = new User().generateSchema();
    }
}
