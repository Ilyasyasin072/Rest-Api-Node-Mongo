const express = require('express')
require('express-group-routes')
const router = express.Router()

// const protectedRouter = withJWTAuthMiddleware(router, "7d7a9b82b273649495972cfea4e87d9b97dc67f8a323dd5cb6216b1129339fdd9fcdd1138a7645934e97cfad9461351bea476045ecc87a91376ae3361e496971");
const authController = require('../app/controllers/authController')

// Auth
// router.group('/auth', (router) => {
router.post('/register', authController.register)
router.post('/login', authController.login)
// })

module.exports = router