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
var app = express();
require('./src/middleware/passport')(passport, app);
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

            if (re == 0) {
                return '';
            }
            else {
                return 'checked';
            }
        },
        getDate : function (date) {
            var day=date.toString().split(" ").slice(0,5).join(' ');
            return day;
        },
        formatDate: function (date) {
            let day = new Date(date);
            return day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + " " + day.getUTCHours() + ':' + day.getUTCMinutes();
        },
        relativeTime: function (options) {
            var timeAgo = new Date(options);

            if (Object.prototype.toString.call(timeAgo) === "[object Date]") {
                if (isNaN(timeAgo.getTime())) {
                    return 'Not Valid';
                } else {
                    var seconds = Math.floor((new Date() - timeAgo) / 1000),
                        intervals = [
                            Math.floor(seconds / 31536000),
                            Math.floor(seconds / 2592000),
                            Math.floor(seconds / 86400),
                            Math.floor(seconds / 3600),
                            Math.floor(seconds / 60)
                        ],
                        times = [
                            'year',
                            'month',
                            'day',
                            'hour',
                            'minute'
                        ];

                    var key;
                    for (key in intervals) {
                        if (intervals[key] > 1)
                            return intervals[key] + ' ' + times[key] + 's ago';
                        else if (intervals[key] === 1)
                            return intervals[key] + ' ' + times[key] + ' ago';
                    }

                    return Math.floor(seconds) + ' seconds ago';
                }
            } else {
                return 'Not Valid';
            }
        },
        user: function () {
            return app.locals.user;
        }
    }
});

app.engine('handlebars', handlebars.engine);


require('./routes')(app,passport);
app.listen(process.env.PORT || 3000);

console.log('Listening on port 3000');
