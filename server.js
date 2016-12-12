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
    flash = require('connect-flash');
require('./middleware/passport')(passport);
var app = express();

app.use(cookieParser('energymonitor'));
app.use(cookieSession({
    keys: ['key1', 'key2']
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(serveStatic('./public'));
app.use(flash());
//app.use(express.favicon(__dirname + '/public/images/shortcut-icon.png'))

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

require('./routes')(app,passport);
app.listen(process.env.PORT || 3000);

console.log('Listening on port 3000');
