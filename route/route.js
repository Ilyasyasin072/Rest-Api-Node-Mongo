const express = require('express')
require('express-group-routes')
const bp = require('body-parser')
// const { withJWTAuthMiddleware } = require("express-kun");
const router = express.Router()

// const protectedRouter = withJWTAuthMiddleware(router, "7d7a9b82b273649495972cfea4e87d9b97dc67f8a323dd5cb6216b1129339fdd9fcdd1138a7645934e97cfad9461351bea476045ecc87a91376ae3361e496971");
const { verifyToken } = require('../app/middleware/authJwt');
const customerController = require('../app/controllers/customersController')
const categoryController = require('../app/controllers/categoryController')
const RoomController = require('../app/controllers/roomController')
const reservationController = require('../app/controllers/reservationController')
const employeeController = require('../app/controllers/employeeController')
const jobController = require('../app/controllers/jobController')
const checkController = require('../app/controllers/checkController')
const authController = require('../app/controllers/authController')


router.group('/v1', (router) => {

    // Auth
    router.group('/auth', (router) => {
        router.post('/register', authController.register)
        router.post('/login', authController.login)
    })

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
        router.get('/', [verifyToken], categoryController.index)
        router.post('/store', [verifyToken], categoryController.store)
        router.put('/update/:id', [verifyToken], categoryController.update)
        router.get('/show/:id', [verifyToken], categoryController.show)
        router.delete('/delete/:id', [verifyToken], categoryController.destroy)
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

    // Check
    router.group('/check', (router) => {
        router.get('/', checkController.index)
        router.post('/store', checkController.store)
    })
})

module.exports = router