# Energy-Monitoring-System

##How to Setup

1. Clone
2. install node, npm
3. cd into dir
4. npm install
5. Edit db.config.js
6. compile models  by running ```npm run compile```
7. migrate models to database by running ```npm run migrate```
8. npm start

enjoy !!

##How to use the framework

### Creating a model

1. should reside under model folder
2. create a new js file to each class model
3. extend Model base class
4. define fields in the constructor

ex: 
```javascript
export default class User extends Model{
    constructor(){
        super();
        this.id = new field.IntegerField(null, true, null, true, true);
        this.first_name = new field.CharField(30,);
        this.last_name = new field.CharField(50,false);
        this.user_name = new field.CharField(20);
        this.email = new field.CharField(40);
        this.password = new field.CharField(100);
        this.is_admin = new field.BooleanField(true, false);

    }
}
```
Basic methods for a model
 * find(params, callback(err,model))
```javascript
User.find({user_name:"prabod",email:"praboderathnayaka@gmail.com"}, function (err, user) {
            /** user = [{
                       id: 1,
                       first_name: 'Prabod',
                       last_name: 'Rathnayaka',
                       user_name: 'prabod',
                       email: 'praboderathnayaka@gmail.com',
                       password: '$2a$08$z7ELhdgazimXDx8hXx2Cd.fQn.4/7k59OCLLTiDfoy39rJd9K28Hq',
                       is_admin: 0 }]
              **/
            let loggedin = new User();
            loggedin.fromDB(user);
            done(err, loggedin);
        });
```

 * findOne(params, callback(err,model))
```javascript
User.findOne({user_name:"prabod",email:"praboderathnayaka@gmail.com"}, function (err, user) {
         /** user = {
                    id: 1,
                    first_name: 'Prabod',
                    last_name: 'Rathnayaka',
                    user_name: 'prabod',
                    email: 'praboderathnayaka@gmail.com',
                    password: '$2a$08$z7ELhdgazimXDx8hXx2Cd.fQn.4/7k59OCLLTiDfoy39rJd9K28Hq',
                    is_admin: 0 }
           **/
         let loggedin = new User();
         loggedin.fromDB(user);
         done(err, loggedin);
     });
```

 * findById(id, callback(err,model))
```javascript
User.findById(1, function (err, user) {
         /** user = [{
                    id: 1,
                    first_name: 'Prabod',
                    last_name: 'Rathnayaka',
                    user_name: 'prabod',
                    email: 'praboderathnayaka@gmail.com',
                    password: '$2a$08$z7ELhdgazimXDx8hXx2Cd.fQn.4/7k59OCLLTiDfoy39rJd9K28Hq',
                    is_admin: 0 }]
           **/
         let loggedin = new User();
         loggedin.fromDB(user);
         done(err, loggedin);
     });
```

 * save(callback)
```javascript
    let newUser = new User();
    // set the user's local credentials
    newUser.email.set(email);
    newUser.password.set(User.generateHash(password));
    newUser.first_name.set(req.body.first_name);
    newUser.last_name.set(req.body.last_name);
    newUser.user_name.set(req.body.user_name);
    // save the user
    newUser.save(function (err, result) {
        if (err)
            throw err;
        return done(null, newUser);
    });
```

 * fromDB(object)
 ``
 refer find
 ``

#### Available Fields

* CharField
* IntegerField
* FloatField
* BooleanField
* DateField
* DateTimeField //todo
* ForiegnKeyField //todo
* OneToOneField //todo
* ManyToManyField //todo

Options for field => maxLength,required,defaultVal,pk,ai


