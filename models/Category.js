const {
    model, Schema
} = require('../config/database');

const categorySchema = new Schema({
    name: String,
    description: String,
},
    { timestamps: true, versionKey: false })

const Category = model('categories', categorySchema)

module.exports = Category 