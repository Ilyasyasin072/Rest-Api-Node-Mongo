const index = async (req, res) => {
    var data = {
        'method': 'GET',
    }
    res.json(data)
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