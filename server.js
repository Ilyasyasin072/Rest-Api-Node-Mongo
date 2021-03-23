const express = require('express');
const app = express();
const routers = require('./route/route');
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json({
    limit: "8mb",
}));

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", process.env.DOMAIN); // update to match the domain you will make the request from
    
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    
    next();
  });

app.get('/', function() {
    console.log('Server Starting');
})


app.use('/api', routers);

app.listen(process.env.PORT, ()=> {
    console.log(`Server Starting http://localhost:${process.env.PORT}`);
})