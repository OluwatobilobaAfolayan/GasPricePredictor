var express = require('express');
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');

var intro = require('./routes/index.js');
var clientInfoController = require('./routes/ClientInformationController');
var quoteController = require('./routes/QuoteController');

//var port = process.env.PORT || 3000;
//app.listen(port, () => {
  //console.log("We here")
//})

app.use('/', intro);
app.use('/clientsInfo', clientInfoController);
app.use('/quotes', quoteController);
app.use(bodyParser.json()); // for parsing application/json
app.listen(3000);


module.exports = app;
