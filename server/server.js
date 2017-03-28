// Dependencies
var express = require('express');
var session = require('express-session');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');

// Setup application
global.appRoot = path.resolve(__dirname);

app.use(express.static('public'));

app.use(session({
  secret : 'wrhlRhkWLHNVWxdn',
  resave : false,
  saveUninitialized : false
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : true
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
});

require('./controllers/routes.js')(app);

var port = process.env.PORT || 3000;
http.listen(port, function() {
  console.log('Listening on port ' + port);
});
