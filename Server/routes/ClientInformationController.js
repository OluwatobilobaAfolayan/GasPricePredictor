var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var ClientInfo = require('./ClientInformation');

//GET: get a client from database
router.get('/:id', function (req, res) {
    ClientInfo.findById(req.params.id, function (err, client) {
        if (err) return res.status(500).send("There was a problem finding the client.");
        if (!client) return res.status(404).send("No client found.");
        res.status(200).send(client);
    });
});

//GET: get all clients from the database
router.get('/', function (req, res) {
  ClientInfo.find({}, function (err, client) {
      if (err) {
          return res.status(500).send("There was a problem finding the client.");
      }
      return res.status(200).send(client);
  });
});

//POST: add new client to databases
router.post('/', function (req, res){
    ClientInfo.create({
            clientId:req.body.clientId,
            fullName: req.body.fullName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            phone: req.body.phone,
            email: req.body.email
        },
        function (err, client) {
            if (err) {
                return res.status(500).send("There was a problem adding the information to the database.");
            }
            res.status(200).send(client);
        });
});

//PUT: update client info
router.put('/:id', function (req, res) {
    ClientInfo.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, client) {
        if (err) return res.status(500).send("There was a problem updating this client.");
            res.status(200).send(client);
    });
});

//DELETE: delete client from database
router.delete('/:id', function (req, res) {
    ClientInfo.findByIdAndRemove(req.params.id, function (err, client) {
        if (err) return res.status(500).send("There was a problem deleting this client.");
        res.status(200).send(client.name +" has been deleted.");
    });
});

module.exports = router;
