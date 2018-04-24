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

    /*db
        .collection("Todos")
        .findOneAndUpdate({ _id: new ObjectID("5adf9e138276be41d0394a1e") }, { $set: { completed: true } }, { returnOriginal: false })
        .then(result => {
            console.log(result);
        });*/

    db
        .collection("Users")
        .findOneAndUpdate({ _id: new ObjectID("5adfa1098276be41d0394a1f") }, { $set: { name: 'folake' }, $inc: { age: 1 } }, { returnOriginal: false })
        .then(result => {
            console.log(result);
        });

    //client.close();
})