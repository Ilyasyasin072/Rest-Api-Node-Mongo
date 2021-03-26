const jwt = require('jsonwebtoken');
const config = require('../../config/config')
const User = require('../../models/User');

const verifyToken = (req, res, next) => {

  let token = req.headers['x-access-token']
  
  // var token = jwt.sign({
  //   id: user._id
  // },
  //   config.secret, {
  //   expiresIn: 86400
  // })

  // console.log(token)

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, { algorithm: 'RS256' }, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = {
  verifyToken
}