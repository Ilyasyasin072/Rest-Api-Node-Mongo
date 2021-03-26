// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());
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
        password: hashedPassword,
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

    if (username && password) {

        const users = await User.findOne({ username: username }).then((user) => {

            bcrypt.compare(password, user.password, (err, data) => {
                if (err) throw err;

                if (data) {

                    var token = jwt.sign({
                        id: user._id
                    },
                        config.secret, {
                        expiresIn: 86400
                    })

                    // console.log(user)

                    // user.updateOne({
                    //     _token : token
                    // })

                    // console.log(token)
                    // var token = req.headers['x-access-token']
                    if (!token) return res.status(500).json({ 'status': 'Not Allowed Token' })
                    jwt.verify(token, config.secret, function (err, decoded) {
                        
                        // user.updateOne({
                        //     _id: decoded.id
                        // }, {
                        //     _token : token
                        // })

                        user.save(function(err, user) {
                            if (err) {
                              return callback(err);
                            } else {
                              console.log("Returned user:");
                              console.dir(user);
                            //   User.find({}, "+token +password", function(err, foundUser) {
                            //     if (err) {
                            //       throw err;
                            //     } else {
                            //       console.log(JSON.stringify(foundUser));
                            //     }
                            //   });
                            //   callback(null, new SuccessEnvelope(user));
                            }
                          });


                        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                        res.cookie('jwt', token);
                        return res.status(200).json({ msg: "Login success", user: user })
                    })
                    
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" })
                }
            })
        })
        
        return users
    } else {
        return res.status(401).json({ msg: "Check Username and Password" })
    }
}

module.exports = {
    register,
    login
}