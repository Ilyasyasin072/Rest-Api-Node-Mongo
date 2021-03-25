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

    const reservationField = {
        user_id: '60595c643248981f2374c6c8',
        room_id: '605aeb3240a95968c68aea37',
        name_reservation: 'Reservasi Kamar Hotel Under Rp. 200.000'
    }

    const checkData = await Reservation.findOne({
        name_reservation: reservationField.name_reservation
    })
    try {

        if (checkData) {

            const message = 'Error Cannot Duplicate Record '

            var err = new ApiResponser('Error', message, 500);

            res.status(500)
            res.json(err.data);

        } else {


            const reservation = await Reservation.create(reservationField)

            const data = new ApiResponser('POST', reservation, 200);

            res.status(200)

            res.json(data.data)

        }

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

        res.status(200);
        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('Error', error.message, 500)

        res.status(500);
        res.json(err.data)
    }
}

const show = async (req, res) => {

    const ObjectId = mongoose.Types.ObjectId;

    const aggregateQuery = Reservation.aggregate([
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

    aggregateQuery.exec((err, result) => {
        if (err) throw err;

        const data = new ApiResponser('GET', result, 200)

        res.status(200);

        res.json(data.data)
    })

}

const destroy = async (req, res) => {

    try {

        const reservation = Reservation.findOneAndDelete(req.params.id)

        const data = new ApiResponser('DELETE', reservation, 200)

        res.status(200);

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('Error', error.message, 500)

        res.status(500);

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