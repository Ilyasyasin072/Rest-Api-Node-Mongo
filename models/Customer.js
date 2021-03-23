const {
    Schema, model
} = require('../config/database');

const customerSchema = new Schema({
    name : String,
    phone_number: String,
    address: String,
    point: String,
    deposit : String,
},
{ timestamps: true, versionKey: false })

const Customer = model('Customer', customerSchema)

module.exports = Customer