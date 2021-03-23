const Customer = require('../../models/Customer');

const index = async (req, res) => {
    const customer = await Customer.find()
    res.json(customer)
}


const store = async (req, res) => {
    res.json({
        'method': 'POST',
    })
}

module.exports = {
    index,
    store
}