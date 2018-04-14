var express = require('express');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

var app = express();

var mongoose = require('mongoose');

var database = require('./config/database');

mongoose.connect(database.url);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

app.use(bodyParser.json());

require('./app/routes.js')(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
