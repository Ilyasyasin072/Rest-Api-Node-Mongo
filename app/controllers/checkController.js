const Check = require('../../models/Check')
const ApiResponser = require('./traits/ApiResponse')

const index = async (req, res) => {


    var aggregateQuery = Check.aggregate([

        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id', as: 'users'
            },
        },
        {

            $unwind: "$users"

        },
        {
            $lookup: {
                from: 'reservations',
                localField: 'reservation_id',
                foreignField: '_id', as: 'reservations'
            },
        },
        {

            $unwind: {
                path : "$reservations",
                preserveNullAndEmptyArrays: true
            }
            
        },
        {
            $lookup: {
                from: "rooms",
                localField: "reservations.room_id",
                foreignField: "_id",
                as: "reservations.rooms",
            }
        },

    ])

    aggregateQuery.exec(function (err, result) {
        const data = new ApiResponser('GET', result, 200)
        res.json(data.data);
    })
}

module.exports = {
    index
}