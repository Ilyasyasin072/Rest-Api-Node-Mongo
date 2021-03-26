const {
    Schema, model
} = require('../config/database')

const paymentSchema = new Schema({

    reservation_id: Schema.ObjectId,
    user_id: Schema.ObjectId,
    check_id: Schema.ObjectId,
    amount: Number,
    money_change: Number

}, { timestamps: true, versionKey: false })

const Payment = model('Payment', paymentSchema)

module.exports = Payment