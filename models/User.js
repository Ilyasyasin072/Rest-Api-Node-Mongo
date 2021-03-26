const {Schema, model} = require('../config/database')
let mongooseHidden = require('mongoose-hidden')()

const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: { type: String, hide: true },
    _token : String,
}, {

    timestamps: true, versionKey: false  

})

userSchema.plugin(mongooseHidden)

const User = model('Users', userSchema)

module.exports = User;