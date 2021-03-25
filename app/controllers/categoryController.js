const Category = require('../../models/Category')
const ApiResponser = require('./traits/ApiResponse');
var jwt = require('jsonwebtoken');
const config = require('../../config/config')

const index = async (req, res) => {
    try {
        // var token = req.headers['x-access-token']
        // if (!token) return res.status(500).json({ 'status': 'Not Allowed Token' })
        // jwt.verify(token, config.secret, async (err, decoded) => {
        //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        //     res.cookie('jwt', token);
            var category = await Category.find()
            var data = new ApiResponser('GET', category, 200);
            res.json(data.data);
        // })

    } catch (error) {
        var err = new ApiResponser('Error', error.message, 500);

        res.json(err.data);
    }
}

const store = async (req, res) => {

    const categoryBody = {
        name: 'VIP 21',
        description: 'lorem',
    }

    const checkData = await Category.findOne({
        name: categoryBody.name
    })

    try {

        if (checkData) {

            const message = 'Error Cannot Duplicate Record '

            var err = new ApiResponser('Error', message, 500);

            res.status(500)
            res.json(err.data);

        } else {

            var category = await Category.create(categoryBody)

            var data = new ApiResponser('POST', category, 200);

            res.json(data.data)
        }

    } catch (error) {

        var err = new ApiResponser('Error', error.message, 500);

        res.json(err.data);
    }
}

const update = async (req, res) => {

    // const { name, description} = req.body
    const name = 'Update';
    const description = 'Update Juga';

    try {

        const category = await Category.updateOne(
            {
                _id: req.params.id
            },
            {
                name, description
            }
        )

        var data = new ApiResponser('POST', category, 200);

        res.json(data);

    } catch (error) {

        var err = new ApiResponser('Error', error.message, 500);

        res.json(err.data);
    }
}

const show = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id);

        console.log(category)

        const data = new ApiResponser('GET', category, 200)

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('Eror', error.message, 500)

        res.json(err.data);
    }
}


const destroy = async (req, res) => {

    try {

        const category = await Category.deleteOne(req.params.id);

        const data = new ApiResponser('DELETE', category, 200)

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