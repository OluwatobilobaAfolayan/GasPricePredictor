var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Quote = require('./Quote');

//GET: get a quote by Id  from the database
router.get('/:id', function (req, res) {
  Quote.findById(req.params.id, function (err, quote) {
      if (err) return res.status(500).send("There was a problem finding this quote.");
      if (!quote) return res.status(404).send("No quote was found.");
      res.status(200).send(quote);
  });
});

//GET: get all quotes from the database
router.get('/', function (req, res) {
  Quote.find({}, function (err, quote) {
      if (err) {
          return res.status(500).send("There was a problem finding this quote.");
      }
      return res.status(200).send(quote);
  });
});

//POST: add new quote to database
router.post('/', function(req, res) {
  Quote.create({
    quoteId: req.body.quoteId,
    clientId: req.body.clientId,
    gallonsRequested: req.body.gallonsRequested,
    requestDate: req.body.requestDate,
    deliveryDate: req.body.deliveryDate,
    deliveryAddress: req.body.deliveryAddress,
    deliveryCity: req.body.deliveryCity,
    deliveryState: req.body.deliveryState,
    deliveryZipCode: req.body.deliveryZipCode,
    deliveryContactName: req.body.deliveryContactName,
    deliveryContactPhone: req.body.deliveryContactPhone,
    deliveryContactEmail:req.body.deliveryContactEmail,
    suggestedPrice:req.body.suggestedPrice,
    totalAmountDue: req.body.totalAmountDue
  },
  function(err, quote) {
    if (err) {
        return res.status(500).send("There was a problem adding this quote to the database.");
    }
    res.status(200).send(quote);
  })
});

//PUT: update quote info
router.put('/:id', function (req, res) {
    Quote.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, quote) {
        if (err) return res.status(500).send("There was a problem updating this quote.");
            res.status(200).send(quote);
    });
});

//DELETE: delete a quote from database
router.delete('/:id', function (req, res) {
    Quote.findByIdAndRemove(req.params.id, function (err, quote) {
        if (err) return res.status(500).send("There was a problem deleting this quote.");
        res.status(200).send(quote.deliveryContactName +" quote has been deleted.");
    });
});

module.exports = router;
