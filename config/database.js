var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const conectionMongo = async () => {
    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("reservasi");
        dbo.collection("customers", function (err, res) {
            if (err) throw err;
            console.log(res)
            db.close();
        });
    });
}

conectionMongo();


module.exports = {
    conectionMongo
}