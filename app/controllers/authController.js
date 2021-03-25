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
    
    const { name, username, email, password } = req.body;
    
    const hashedPassword = bcrypt.hashSync(password, 8)
    
    const userField = {
        name: name,
        username: username,
        email: email,
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
            auth: true, token: token
        })
    }))

}

const login = async (req, res) => {

    const { username, password } = req.body;

    var token = req.headers['x-access-token']

    const users = await User.findOne({ username: username, password: password })

    if (users) {
        var token = req.headers['x-access-token']
        if (!token) return res.status(500).json({ 'status': 'Not Allowed Token' })
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            res.status(200).send(decoded);
        })
    } else {
        res.status(500).send({ auth: false, message: 'Not Have Account' });
    }
}

module.exports = {
    register,
    login
}