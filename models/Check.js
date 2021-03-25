const {
    model, Schema
} = require('../config/database');

const checkSchema = new Schema({
    // msisdn     : { type : String , unique : true, required : true, dropDups: true },
    user_id : Schema.ObjectId,
    reservation_id : { type : Schema.ObjectId, index: true,  unique : true },
    date_in: String,
    date_out : String,

}, { timestamps: true, versionKey: false })

const Check = model('Check', checkSchema);

Check.on('index', function (err) {
    if (err) console.error(err);
  })

module.exports = Check