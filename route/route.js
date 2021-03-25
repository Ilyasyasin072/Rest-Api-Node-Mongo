const express = require('express')
require('express-group-routes')

const router = express.Router()

const customerController = require('../app/controllers/customersController')
const categoryController = require('../app/controllers/categoryController')
const RoomController = require('../app/controllers/roomController')
const reservationController = require('../app/controllers/reservationController')
const employeeController = require('../app/controllers/employeeController')
const jobController = require('../app/controllers/jobController')


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
        router.post('/store', RoomController.store)
        router.put('/update/:id', RoomController.update)
        router.get('/show/:id', RoomController.show)
        router.delete('/delete/:id', RoomController.destroy)
    })

    // Reservation
    router.group('/reservation', (router) => {
        router.get('/', reservationController.index)
        router.post('/store', reservationController.store)
        router.put('/update/:id', reservationController.update)
        router.get('/show/:id', reservationController.show)
        router.delete('/delete/:id', reservationController.destroy)
    })

    // Employee
    router.group('/employee', (router) => {
        router.get('/', employeeController.index)
        router.post('/store', employeeController.store)
        router.put('/update/:id', employeeController.update)
        router.get('/show/:id', employeeController.show)
        router.delete('/delete/:id', employeeController.destroy)
    })

    // Jobs
    router.group('/jobs', (router) => {
        router.get('/', jobController.index)
        router.get('/store', jobController.store)
        router.get('/update/:id', jobController.update)
        router.get('/show/:id', jobController.show)
        router.get('/delete/:id', jobController.destroy)
    })
})

module.exports = router