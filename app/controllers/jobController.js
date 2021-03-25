const Job = require('../../models/Job')
const ApiResponser = require('./traits/ApiResponse')
const mongoose = require('mongoose')

const index = async (req, res) => {

    try {

        const jobs = await Job.find()

        const data = new ApiResponser('GET', jobs, 200)

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('GET', error.message, 200)

        res.json(err.data)
    }
}

const store = async (req, res) => {

    const jobField = {
        name: 'Manager',
        description: 'Manager Mewah'
    }

    try {

        const job = await Job.create(jobField)

        const data = new ApiResponser('POST', job, 200)

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('Error', error.message, 500)

        res.json(err.data)

    }
}

const update = async (req, res) => {

    const jobField = {
        name: 'SPV Bro',
        description: 'Manager Mewah'
    }

    try {

        const job = await Job.updateOne({

            _id: req.params.id,

        }, {

            name: jobField.name,
            description: jobField.description
        })

        const data = new ApiResponser('POST', job, 200)

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('Error', error.message, 500)

        res.json(err.data)

    }
}


const show = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id)

        const data = new ApiResponser('GET', job, 200)

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('Error', error.message, 500)

        res.json(err.data)
    }
}

const destroy = async (req, res) => {
    
    try {

        const job = await Job.findByIdAndDelete(req.params.id)

        const data = new ApiResponser('GET', job, 200)

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('Error', error.message, 500)

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