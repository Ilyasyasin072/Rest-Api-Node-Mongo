var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var User = require('../../models/User')
const config = require('../../config/config')


const register = async (req, res) => {

    const hashedPassword = bcrypt.hashSync('root123', 8)
    const userField = {
        name: 'root',
        username: 'root123',
        email: 'root123',
        password: hashedPassword
    }

    User.create(userField, ((err, user) => {
        if (err) return res.status(500).send('There was a problem registering the user.')
        var token = jwt.sign({
            id: user._id
        }, 
        config.secret, {
            expiresIn: 86400
        })

        res.status(200).send({
            auth: true, token:token
        })
    }))

}

const login = async (req, res) => {

    var token = req.headers['x-access-token']

    if (!token) return res.status(500).send('Not Allowed Token')

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    res.status(200).send(decoded);
    })
}

module.exports = {
    register,
    login
}