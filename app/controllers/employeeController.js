const Employee = require('../../models/Employee')
const ApiResponser = require('./traits/ApiResponse')
const mongoose = require('mongoose')

const index = async (req, res) => {

    const AggregateQuery = Employee.aggregate([
        {
            $lookup: {
                from: 'jobs',
                localField: 'job_id',
                foreignField: '_id',
                as: 'jobs'
            },
        },
        {

            $unwind: "$jobs"

        },
    ])

    AggregateQuery.exec((err, result) => {
        if (err) throw err
        const data = new ApiResponser('GET', result, 200)

        res.json(data.data)
    })

}

const store = async (req, res) => {

    const employeeField = {
        job_id: '605bef52f143c626d5900e2c',
        name: "Dodi Bro",
        address: "Jalan Joko DIkromo",
        phone: "0854478794",
        email: 'aa@gmail.com',
        qualification: "S1",
        date_of_entry: "02/02/2021",
        date_of_birht: "02-02-1994",
        date_of_out: "",
    }

    const checkData = await Employee.findOne({
        email: employeeField.email
    })

    try {

        if (checkData) {

            const message = 'Error Cannot Duplicate Record '

            var err = new ApiResponser('Error', message, 500);

            res.status(500)
            res.json(err.data);

        } else {

            const employee = await Employee.create(employeeField)

            const data = new ApiResponser('POST', employee, 200)

            res.json(data.data)
        }

    } catch (error) {

        const err = new ApiResponser('Error', error.message, 500)

        res.json(err.data)
    }
}

const update = async (req, res) => {

    const employeeField = {

        job_id: '605bef52f143c626d5900e2c',
        name: "Dodi Bro",
        address: "Jalan Joko DIkromo",
        phone: "0854478794",
        email: 'aa@gmail.com',
        qualification: "S1",
        date_of_entry: "02/02/2021",
        date_of_birht: "02-02-1994",
        date_of_out: "",
    }

    try {

        const employee = await Employee.updateOne({
            _id: req.params.id
        }, {

            job_id: employeeField.job_id,
            name: employeeField.name,
            address: employeeField.address,
            phone: employeeField.phone,
            qualification: employeeField.qualification,
            date_of_entry: employeeField.date_of_entry,
            date_of_birht: employeeField.date_of_birht,
            date_of_out: employeeField.date_of_out,
        })

        const data = new ApiResponser('PUT', employee, 200)

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('Error', error.message, 500)

        res.json(err.data)

    }
}

const show = async (req, res) => {

    const ObjectId = mongoose.Types.ObjectId;

    const AggregateQuery = Employee.aggregate([
        {
            $match: { _id: ObjectId(req.params.id) }
        },
        {
            $lookup: {
                from: 'jobs',
                localField: 'job_id',
                foreignField: '_id',
                as: 'jobs'
            }
        },
        {

            $unwind: "$jobs"

        },
    ])

    AggregateQuery.exec((err, result) => {

        if (err) throw err

        const data = new ApiResponser('GET', result, 200)

        res.json(data.data)
    })
}

const destroy = async (req, res) => {

    try {

        const employee = await Employee.findOneAndDelete(req.params.id)

        const data = new ApiResponser('DELETE', employee, 200)

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('GET', error.message, 200)

        res.json(err.data)

    }
}

module.exports = {
    index,
    store,
    update,
    show,
    destroy
}