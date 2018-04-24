const { MongoClient, ObjectID } = require('mongodb');
const assert = require("assert");



// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "TodoApp";

MongoClient.connect(url, (err, client) => {
    assert.equal(null, err, 'Unable to connect to MongoDB server')
    console.log('Connected to the MongoDB server');

    const db = client.db(dbName);

    /*db.collection('Todos').deleteMany({ text: 'Eat dinner' }).then((result) => {
        console.log(result.result);
    })

    db.collection('Todos').deleteOne({ text: 'Eat dinner' }).then((result) => {
        console.log(result.result);
    })*/

    db
        .collection("Todos")
        .findOneAndDelete({ text: "Eat dinner" })
        .then(result => {
            console.log(result);
        });

    //client.close();
})