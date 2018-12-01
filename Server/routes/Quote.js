var mongoose = require('mongoose');
var Quote = new mongoose.Schema({
  quoteId: {
      type: Number
  },
  clientId: {
      type: Number
  },
  gallonsRequested: {
      type: Number,
      min: 1,
      required: [true, 'Number of gallons is required']
  },
  requestDate: {
      type: Date,
      required: [true, 'Request date is required']
  },
  deliveryDate: {
      type: Date,
      required: [true, 'Delivery date is required']
  },
  deliveryAddress:{
      type: String,
      required: [true, 'Location is required']
  },
  deliveryCity:{
      type: String,
      required: [true, 'Location is required']
  },
  deliveryState:{
      type: String,
      required: [true, 'Location is required']
  },
  deliveryZipCode:{
      type: String,
      required: [true, 'Location is required']
  },
  deliveryContactName:{
      type: String,
      required: [true, 'Delivery Contact Name is required']
  },
  deliveryContactPhone:{
      type: String,
      required: [true, 'Contact Phone Number is required']
  },
  deliveryContactEmail:{
      type: String,
      required: [true, 'Email field is required']
  },
  suggestedPrice:{
      type: Number,
      required: [true, 'Suggested price field is required']
  },
  totalAmountDue:{
        type: Number
  }
});

/*Quote.path('clientId')
    .get(function(value) {
        return value;
    })
    .set(function(value) {
        return value;
});

Quote.path('gallonsRequested')
    .get(function(value) {
        return value;
    })
    .set(function(value) {
        return value;
});

Quote.path('deliveryDate')
    .get(function(value) {
        return value;
    })
    .set(function(value) {
        return value;
});

Quote.path('requestDate')
      .get(function(value) {
          return value;
      })
      .set(function(value) {
          return value;
  });

Quote.path('deliveryLocation')
    .get(function(value) {
        return value;
    })
    .set(function(value) {
        return value;
});

Quote.path('deliveryContactName')
    .get(function(value) {
        return value;
    })
    .set(function(value) {
        return value;
});

Quote.path('deliveryContactPhone')
    .get(function(value) {
        return value;
    })
    .set(function(value) {
        return value;
});

Quote.path('deliveryContactEmail')
    .get(function(value) {
        return value;
    })
    .set(function(value) {
        return value;
});

Quote.path('suggestedPrice')
    .get(function(value) {
        return value;
    })
    .set(function(value) {
        return value;
});

Quote.path('totalAmountDue')
    .get(function(value) {
        return value;
    })
    .set(function(value) {
        return value;
});*/

mongoose.model('Quote', Quote);
module.exports = mongoose.model('Quote');
