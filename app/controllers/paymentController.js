const Payment = require('../../models/Payment')
const mongoose = require('mongoose')
const ApiResponser = require('./traits/ApiResponse')

const index = async (req, res) => {

    const payment = Payment.aggregate([
        {
            $lookup: {
                from : 'reservations',
                localField: 'reservation_id',
                foreignField : '_id',
                as : 'reservations'
            }
        }, 
        {
            $unwind: "$reservations",
            // preserveNullAndEmptyArrays: true
        },
        {
            $lookup : {
                from : 'rooms',
                localField: 'reservations.room_id',
                foreignField: '_id',
                as : 'rooms'
            }
        },
        {
            $lookup : {
                from : 'users',
                localField: 'reservations.user_id',
                foreignField: '_id',
                as : 'users'
            }
        },
    ])

    payment.exec((err, result) => {
        if (err) throw err;
        res.status(200)
        
        const data = new ApiResponser('GET', result, 200)

        res.json(data.data)

    })
}


module.exports = {
    index
}