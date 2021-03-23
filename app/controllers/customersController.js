const Customer = require('../../models/Customer');

const index = async (req, res) => {

    try {

        const customer = await Customer.find()
        res.json(customer)
    
    } catch (error) {

        res.json(error.message)
    }
}


const store = async (req, res) => {

    const customer = {
        name: 'hai hai',
        phone_number: '12321',
        address: 'asdasd',
        point: '0',
        deposit: '0',
    }

    try {

        console.log(customer);

        const store = await Customer.create(customer);
        res.json({
            'method': 'POST',
            'result': store
        })

    } catch (error) {

        res.json(error.message)
    }
}

module.exports = {
    index,
    store
}