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

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        assert.equal(null, err, 'Unable to insert document')

        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    db
        .collection("Users")
        .insertOne({
                name: 'Moore',
                age: 25,
                location: 'Nigeria'
            },
            (err, result) => {
                assert.equal(null, err, "Unable to insert document");

                console.log(JSON.stringify(result.ops, undefined, 2));
                console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
            }
        );


    client.close();
})