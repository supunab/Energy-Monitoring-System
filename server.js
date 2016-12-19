#!/usr/bin/env node
require("babel-register");

var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    serveStatic = require('serve-static'),
    expressValidator = require('express-validator'),
    passport = require('passport'),
    crypto = require('crypto'),
    flash = require('connect-flash'),
    path = require('path');
require('./src/middleware/passport')(passport);
var app = express();
app.use(cookieParser('energymonitor'));
app.use(cookieSession({
    keys: ['key1', 'key2']
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', __dirname + '/src/views');
app.set('view engine', 'handlebars');
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(serveStatic('./src/public'));
app.use(flash());
//app.use(express.favicon(__dirname + '/public/images/shortcut-icon.png'))
console.log(__dirname + '/src/views');
var handlebars = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, "src/views/layouts"),
    partialsDir: path.join(__dirname, "src/views/partials"),
    defaultLayout: 'main',
    helpers: {
        getType : function (re) {
            if(re==0) return false;
            else return true;
        },
        getDate : function (date) {
            var day=date.toString().split(" ").slice(0,5).join(' ');
            return day;
        }
    }
});

app.engine('handlebars', handlebars.engine);


require('./routes')(app,passport);
app.listen(process.env.PORT || 3000);

console.log('Listening on port 3000');
