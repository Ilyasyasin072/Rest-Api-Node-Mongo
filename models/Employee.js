const {
    Schema, model
} = require('../config/database');

const employeeSchema = new Schema({

    job_id : Schema.ObjectId,
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    qualification: { type: String, required: true },
    date_of_entry: { type: Date, default: Date.now },
    date_of_birth: { type: Date },
    date_of_out: String,

}, { timestamps: true, versionKey: false })

const Employee = model('Employee', employeeSchema);

module.exports = Employee