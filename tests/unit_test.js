/**
 * Created by prabod on 12/9/16.
 */
import User from '../model/User'
import orm from '../orm/orm'

let user = new User();
console.log(user.generateSchema());
let o = new orm('localhost', 'root', 'root', 'university');
let yy = User.findOne({first_name: "prabood"},
    function (error, user) {
        console.log(user.first_name);
    });


