import User from '../model/User'
import Complaint from '../model/Complaint'
import Test from '../model/Test'
import Area from '../model/Area'

import orm from '../orm/orm'

let user = new User();
let complaint = new Complaint();
console.log(user.generateSchema());
console.log(complaint.generateSchema());
let o = new orm('localhost', 'root', 'root', 'university');


let area1 = new Area();
area1.name.set("a");
let area2 = new Area();
area2.name.set("b");
let area3 = new Area();
area3.name.set("c");
let ids = [1, 2, 3];
// area1.save(function (err, result) {
//     if(!err){
//         ids.push(result.insertId);
//     }
// });
// area2.save(function (err, result) {
//     if(!err){
//         ids.push(result.insertId);
//     }
// });
// area3.save(function (err, result) {
//     if(!err){
//         ids.push(result.insertId);
//     }
// });
let test = new Test();
test.name.set("test");
test.area.set(ids);
test.save(function (err, result) {
    if (!err) {
        console.log(result);
    }
});
