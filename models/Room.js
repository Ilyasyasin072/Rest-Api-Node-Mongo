const {
    Schema, model
} = require('../config/database');

const roomSchema = new Schema({
    name_room: String,
    type_room: String,
    price_room: String,
    number_of_room: String,
},
    { timestamps: true, versionKey: false })

const Room = model('room', roomSchema)

module.exports = Room