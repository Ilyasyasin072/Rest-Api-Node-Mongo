const Category = require('../../models/Category')
const ApiResponser = require('./traits/ApiResponse');

const index = async (req, res) => {
    try {

        var category = await Category.find()

        var data = new ApiResponser('GET', category, 200);

        res.json(data.data);

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
   
    try {
        var category = await Category.create(categoryBody)

        var data = new ApiResponser('POST', category, 200);

        res.json(data.data)

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


module.exports = {
    index,
    store,
    update,
}