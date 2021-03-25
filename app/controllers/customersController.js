const Customer = require('../../models/Customer');
const ApiResponser = require('./traits/ApiResponse');

const index = async (req, res) => {

    try {

        const customer = await Customer.find()

        const data = new ApiResponser('GET', customer, 200);

        res.json(data.data)
    
    } catch (error) {

        const err = new ApiResponser('GET', error.message, 200);

        res.json(err)
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
    
    // const checkData = await Customer.findOne({
    //     name: categoryBody.name
    // })

    try {

        // console.log(customer);

        const store = await Customer.create(customer);
        res.json({
            'method': 'POST',
            'result': store
        })

    } catch (error) {

        res.json(error.message)
    }
}

const update = async (req, res) => {

    const customerField = {
        name : 'Hai ini di update', 
        phone_number: '123',
        address: 'lorem',
        point: '123',
        deposit: '123',
    }

    const customer = await Customer.updateOne(
        { 
            _id : req.params.id
        },
        {
            name : customerField.name,
            phone_number : customerField.phone_number,
            address : customerField.address,
            point : customerField.point,
            deposit : customerField.deposit,
        }
    )

    var data = new ApiResponser('PUT', customer, 200)

    res.json(data);
}


const show = async (req, res) => {

    try {

        const customer = await Customer.findById(req.params.id)

        const data = new ApiResponser('GET', customer, 200)

        res.json(data.data)
        
    } catch (error) {

        const err = new ApiResponser('Error' ,error.message, 500)

        res.json(err.data)
        
    }
}


const destroy = async (req, res) => {

    try {
        
        const customer = await Customer.deleteOne(req.params.id);

        const data = new ApiResponser('DELETE', customer, 200);

        res.json(data.data)

    } catch (error) {
        
        const err = new ApiResponser('Error', error.message, 500)

        res.json(err.data)
    }
}

module.exports = {
    index,
    store,
    update,
    show,
    destroy
}