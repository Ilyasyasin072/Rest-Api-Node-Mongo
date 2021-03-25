require('dotenv').config()
module.exports = {
    // secret: 'reservasi-secret'
    secret: process.env.TOKEN,
}

// console.log(process.env.TOKEN)