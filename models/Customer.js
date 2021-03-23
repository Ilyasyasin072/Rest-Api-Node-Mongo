const {
    Schema, model
} = require('../config/database');

const customerSchema = new Schema({
    name : String,
    phone_number: String,
    address: String,
    point: String,
    depost : String
})

const Customer = model('Customer', customerSchema)

module.exports = Customer