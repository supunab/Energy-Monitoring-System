import User from '../model/User'
import orm from '../orm/orm'

let user = new User();
console.log(user.generateSchema());
let o = new orm('localhost', 'root', 'root', 'university');
let yy = User.findOne({first_name: "Prabod"},
    function (error, user) {
        console.log(user.first_name);
    });


