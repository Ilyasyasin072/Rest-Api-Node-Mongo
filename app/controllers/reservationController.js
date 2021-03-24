const Reservation = require('../../models/Reservasi')
var mongoose = require('mongoose');

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
        res.json(result)
    })
}

const store = async (req, res) => {
    const reservation = {
        user_id: '60595c643248981f2374c6c8',
        room_id: '605aeb3240a95968c68aea37',
        name_reservation: 'ini ke relasi ga Hai'
    }
    const data = await Reservation.create(reservation)

    res.json(data)
}

module.exports = {
    index,
    store
}