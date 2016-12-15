import User from '../model/User'
import Complaint from '../model/Complaint'
import orm from '../orm/orm'

let user = new User();
let complaint = new Complaint();
console.log(user.generateSchema());
console.log(complaint.generateSchema());
let o = new orm('localhost', 'root', 'root', 'university');
let yy = User.findById(1,

