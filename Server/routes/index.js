var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//GET: get all clients from the database
router.get('/', function (req, res) {
    res.send('Hello');
});

module.exports = router
