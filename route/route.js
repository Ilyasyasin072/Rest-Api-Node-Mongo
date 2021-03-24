const express = require('express');
require('express-group-routes');

const router = express.Router();

const customerController = require('../app/controllers/customersController');
const categoryController = require('../app/controllers/categoryController');

router.group('/v1', (router) => {
    router.group('/customer', (router) => {
        router.get('/', customerController.index);
        router.get('/store', customerController.store);
    })

    router.group('/category', (router) => {
        router.get('/', categoryController.index)
        router.post('/store', categoryController.store)
        router.get('/update/:id', categoryController.update)
    })
})

module.exports = router