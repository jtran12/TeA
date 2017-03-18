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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : true
}));

require('./controllers/routes.js')(app);

var port = process.env.PORT || 3000;
http.listen(port, function() {
  console.log('Listening on port ' + port);
});
