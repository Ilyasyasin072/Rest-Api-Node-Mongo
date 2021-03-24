const Room = require('../../models/Room');
const ApiResponser = require('./traits/ApiResponse');

const index = async (req, res) => {
    try {

        var category = await Room.find()

        var data = new ApiResponser('GET', category, 200);

        res.json(data.data);

    } catch (error) {
        var err = new ApiResponser('Error', error.message, 500);

        res.json(err.data);
    }
}

const store = async (req, res) => {

    const roomField = {
        name_room : 'ROOM 01',
        type_room : 'ROOM TYPE',
        price_room: '12000',
        number_of_room: '12',
    }
    
    try {
        
        const room = await Room.create(roomField)

        const data = new ApiResponser('GET', room, 200)

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('Error', error.message, 500)

        res.json(err.data)
        
    }

}

const update = async (req, res) => {
    
    try {
        
        const room = await Room.find(req.params.id)

        const data = new ApiResponser('GET', room, 200)

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('Error', error.message, 500)

        res.json(err.data)
        
    }

}

const show = async (req, res) => {
    
    try {

        const room = await Room.findById(req.params.id)

        const data = new ApiResponser('GET', room, 200)

        res.json(data.data)

    } catch (error) {

        const err = new ApiResponser('Error', error.message, 500)

        res.json(err.data)
        
    }

}

const destroy = async(req, res) => {
    
    try {
       
    
        const room = await Room.findByIdAndDelete(req.params.id)

        const data = new ApiResponser('GET', room, 200)

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