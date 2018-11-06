var mongoose = require('mongoose');

mongoose.useMongoClient
mongoose.connect('mongodb+srv://tobafo19:tobafo19@teamnaija-y3vyh.mongodb.net/Gas_Predictor?retryWrites=true')
    .then(function (data){
        console.log(data);
    }).catch(function (error) {
    console.log("Mongodb connection failed. Error is: " + error)
});
