const Reservation = require('../../models/Reservasi')
const ApiResponser = require('./traits/ApiResponse');
const mongoose = require('mongoose')

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
            name_reservation: 'Reservasi Kamar Hotel Under Rp. 200.000'
        }
        const reservation = await Reservation.create(reservationField)

        const data = new ApiResponser('POST', reservation, 200);

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('POST', error.message, 200);

        res.json(err.data)

    }
}


const update = async (req, res) => {

    const reservationField = {

        user_id: '60595c643248981f2374c6c8',
        room_id: '605aeb3240a95968c68aea37',
        name_reservation: 'Reservasi Kamar Hotel Under Rp. 200.000 FIXED'
    }

    try {

        const reservation = await Reservation.updateOne({
            _id: req.params.id
        }, {
            user_id: reservationField.user_id,
            room_id: reservationField.room_id,
            name_reservation: reservationField.name_reservation,
        })

        const data = new ApiResponser('PUT', reservation, 200)

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('Error', error.message, 500)

        res.json(err.data)
    }
}

const show = async (req, res) => {

    const ObjectId = mongoose.Types.ObjectId;

    const data = Reservation.aggregate([
        {
            $match: { _id: ObjectId(req.params.id) }
        },
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

    data.exec((err, result) => {
        res.json(result)
    })
    
}

const destroy = async (req, res) => {

    try {

    } catch (error) {

    }
}

module.exports = {
    index,
    store,
    update,
    show
}