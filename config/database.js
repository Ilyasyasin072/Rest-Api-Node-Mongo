const mongoose = require('mongoose');
const { Schema, model } = mongoose
const url = 'mongodb://localhost:27017/reservasi';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(function() {
    console.log('Connected to DB');
}).catch(function(err){
    console.log(err)
})

module.exports = {
    Schema, 
    model
}
