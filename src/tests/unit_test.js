import User from '../model/User'
import orm from '../orm/orm'

let user = new User();
console.log(user.generateSchema());
let o = new orm('localhost', 'root', 'root', 'university');
let yy = User.findById(1,
    function (error, user) {
        console.log(user);
    });


