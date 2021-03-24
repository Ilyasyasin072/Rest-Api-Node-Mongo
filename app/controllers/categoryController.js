const Category = require('../../models/Category')

const index = async (req, res) => {
    try {

        var category = await Category.find()
        res.json(category)
    
    } catch (error) {

        res.json(error.message)
    }
}

const store = async (req, res) => {

    const categoryBody = {
        name : 'VIP 2',
        description : 'lorem',
    }
    try {
        var category = await Category.create(categoryBody)

        res.json(category)

    } catch (error) {
        
    }
}

const update = async (req, res) => {

    // const { name, description} = req.body
    const name = 'Update';
    const description = 'Update Juga';

    try {
        
        const category = await Category.updateOne(
            {
                _id : req.params.id
            }, 
            {
            name, description
            }
        )

        res.json(category);

    } catch (error) {
        
    }
}


module.exports = {
    index,
    store,
    update,
}