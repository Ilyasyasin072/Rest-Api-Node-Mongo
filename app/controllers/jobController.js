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


module.exports = {

    index
}