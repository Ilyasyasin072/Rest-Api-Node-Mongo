const {
    Schema, model
} = require('../config/database');

const jobSchema = new Schema({
    name: String,
    description: String
}, { timestamps: true, versionKey: false })

const Job = model('Jobs', jobSchema)

module.exports = Job