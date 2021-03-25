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

const store = async (req, res) => {

    const checkField = {
        user_id : '60595c643248981f2374c6c8',
        reservation_id : '605af4ed79297505669b91c4',
        date_in: '19/10/2021',
        date_out: '20/10/2021'
    }

    const checkData = await Check.findOne({
        reservation_id: checkField.reservation_id
    })

    try {
        
       
        if(checkData) {
            const message = 'Error !! , Duplicate Record'
            const err = new ApiResponser('Error', message, 500)
            res.status(500);
            res.json(err.data)

        } else {
        const check = await Check.create(checkField)

        const data = new ApiResponser('POST', check, 200)

        res.json(data.data)
        }


    } catch (error) {
        
        const err = new ApiResponser('Error', error.message, 500)

        res.json(err.data)
    }
}

module.exports = {
    index,
    store
}