const {Schema, model} = require('../config/database')

const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String
}, {
    timestamps: true, versionKey: false  
})

const User = model('Users', userSchema)

module.exports = User;