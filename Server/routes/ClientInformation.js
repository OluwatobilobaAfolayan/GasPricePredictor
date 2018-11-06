var mongoose = require('mongoose');
//define schema
var Schema = mongoose.Schema;
var ClientInfoSchema = new Schema({
    clientId: {
        type: Number
    },
    fullName: {
        type: String,
        required: [true, 'Name field is required']
    },
    address: {
        type: String,
        required: [true, 'Address field is required']
    },
    city: {
        type: String,
        required: [true, 'City field is required']
    },
    state: {
        type: String,
        required: [true, 'State field is required']
    },
    zipCode: {
        type: Number,
        required: [true, 'Zip code field is required']
    },
    phone: {
        type: Number,
        required: [true, 'Phone number field is required']
    },
    email:{
        type: String,
        required: [true, 'Email field is required']
    }

});

/*ClientInfoSchema.path('clientId')
    .get(function(value) {
        return value;
    })
    .set(function(value) {
        return value;
});

ClientInfoSchema.path('name')
    .get(function(value) {
        return value;
    })
    .set(function(value) {
        return value;
});

ClientInfoSchema.path('address')
    .get(function(value) {
        return value;
    })
    .set(function(value) {
        return value;
});

ClientInfoSchema.path('phone')
      .get(function(value) {
          return value;
      })
      .set(function(value) {
          return value;
  });

ClientInfoSchema.path('email')
    .get(function(value) {
        return value;
    })
    .set(function(value) {
        return value;
});*/

//create model
mongoose.model('ClientInfo', ClientInfoSchema);
module.exports = mongoose.model('ClientInfo');
