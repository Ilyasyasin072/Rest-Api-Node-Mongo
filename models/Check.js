const {
    model, Schema
} = require('../config/database');

const checkSchema = new Schema({
    user_id : Schema.ObjectId,
    reservation_id : Schema.ObjectId,
    date_in: String,
    date_out : String,
}, { timestamps: true, versionKey: false })

const Check = model('Check', checkSchema);

console.log(Check)

module.exports = Check