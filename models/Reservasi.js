const { Int32 } = require('mongodb')
const { Schema, model } = require('../config/database')

const reservasiSchema = new Schema(
    {
        user_id : Schema.ObjectId,
        room_id : Schema.ObjectId,
        name_reservation: String
    }
    , {timestamps: true, versionKey: false })

const Reservation = model('Reservation', reservasiSchema);
module.exports = Reservation