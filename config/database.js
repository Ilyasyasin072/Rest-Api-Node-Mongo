const mongoose = require('mongoose');
const { Schema, model } = mongoose
require('dotenv').config()
// const url = 'mongodb://localhost:27017/reservasi';
const url = process.env.DB_DATABASE

const options = {
    
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true
  }

mongoose.connect(url, options).then(function() {
    console.log('Connected to DB');
}).catch(function(err){
    console.log(err)
})

module.exports = {
    Schema, 
    model
}
