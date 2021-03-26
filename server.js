const express = require('express');
const app = express();
const routers = require('./route/route');
const auth = require('./route/authRoute')
const bodyParser = require('body-parser');
require('dotenv').config()

const cookieParser = require('cookie-parser');
const { verifyToken } = require('./app/middleware/authJwt');
var data = require('crypto').randomBytes(64).toString('hex')
// data = for generate and copy to .env Token
// '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'

app.use(cookieParser());
app.use(bodyParser.json({
    limit: "8mb",
}));

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", process.env.DOMAIN); // update to match the domain you will make the request from

    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
});

app.get('/', function (req, res) {
    res.json({
        message : 'Node js Backend Running'
    })
    console.log('Server Starting');
})


app.use('/api', [verifyToken],  routers);
app.use('/auth', auth)

app.use(function (req, res) {
    if (res.status(404)) {
        
        const error = {
            message: 'File Not Found'
        }
        
        res.json(error)
    
    } else if (res.status(500)) {
        
        const error = {
            message: 'Something Broken'
        }

        res.json(error)
    
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server Starting http://localhost:${process.env.PORT}`);
})