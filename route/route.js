const express = require('express');
require('express-group-routes');

const router = express.Router();

const customerController = require('../app/controllers/customersController');
const categoryController = require('../app/controllers/categoryController');

router.group('/v1', (router) => {
    router.group('/customer', (router) => {
        router.get('/', customerController.index);
        router.post('/store', customerController.store);
        router.put('/update/:id', customerController.update);
    })

    router.group('/category', (router) => {
        router.get('/', categoryController.index)
        router.post('/store', categoryController.store)
        router.put('/update/:id', categoryController.update)
    })
})

module.exports = router