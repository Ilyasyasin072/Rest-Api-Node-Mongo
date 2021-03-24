const Reservation = require('../../models/Reservasi')
const ApiResponser = require('./traits/ApiResponse');

const index = async (req, res) => {

    var aggregateQuery = Reservation.aggregate([

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
                from: 'rooms',
                localField: 'room_id',
                foreignField: '_id', as: 'rooms'
            },
        },
        {

            $unwind: "$rooms"

        },

    ])

    aggregateQuery.exec(function (err, result) {
        const data = new ApiResponser('GET', result, 200)
        res.json(data.data);
    })
}

const store = async (req, res) => {
    try {

        const reservationField = {
            user_id: '60595c643248981f2374c6c8',
            room_id: '605aeb3240a95968c68aea37',
            name_reservation: 'ini ke relasi ga Hai'
        }
        const reservation = await Reservation.create(reservationField)

        const data = new ApiResponser('POST', reservation, 200);

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('POST', error.message, 200);

        res.json(err.data)

    }
}

module.exports = {
    index,
    store
}