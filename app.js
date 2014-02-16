
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var exphbs = require('express3-handlebars');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var db= require('./db');

passport.use(new LocalStrategy(
    function(username, password, done) {
        if (username === "kcl-admin" && password === 'testtest') {
            console.log('yo');
            return done(null, {username: "kcl-admin"});
        }

        return done(null, false);


    }
));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(user, done) {
    done(null, {username: username});
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine("handlebars", exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret:"happy999999"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/browse', routes.browse);

app.get('/quiz', routes.quiz);
app.get('/words', routes.words);
app.get('/about', routes.about);
app.get('/help', routes.help);
app.get('/admin', routes.admin);



app.post('/login',
  passport.authenticate('local', { successRedirect: '/adminHome',
                                   failureRedirect: '/admin'})
);

app.get('/adminHome', routes.adminHome);

app.get('/:category', routes.browseCat);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
