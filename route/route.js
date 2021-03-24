const express = require('express')
require('express-group-routes')

const router = express.Router()

const customerController    = require('../app/controllers/customersController')
const categoryController    = require('../app/controllers/categoryController')
const RoomController        = require('../app/controllers/roomController')

router.group('/v1', (router) => {
    
    // Customer
    router.group('/customer', (router) => {
        router.get('/', customerController.index)
        router.post('/store', customerController.store)
        router.put('/update/:id', customerController.update)
        router.get('/show/:id', customerController.show)
        router.delete('/delete/:id', customerController.destroy)
    })

    // Categories
    router.group('/category', (router) => {
        router.get('/', categoryController.index)
        router.post('/store', categoryController.store)
        router.put('/update/:id', categoryController.update)
        router.get('/show/:id', categoryController.show)
        router.delete('/delete/:id', categoryController.destroy)
    })

    // Room
    router.group('/room', (router) => {
        router.get('/', RoomController.index)
        router.get('/store', RoomController.store)
        router.put('/update/:id', RoomController.update)
        router.get('/show/:id', RoomController.show)
        router.get('/delete/:id', RoomController.destroy)
    })
})

module.exports = router