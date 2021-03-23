const express = require('express');
require('express-group-routes');

const router = express.Router();

const customerController = require('../app/controllers/customersController');

router.group('/v1', (router) => {
    router.group('/customer', (router) => {
        router.get('/data', customerController.index);
        router.get('/store', customerController.store);
    })
})

module.exports = router