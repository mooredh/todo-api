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
        .find({ _id: new ObjectID("5adf9a1b4caf904accbd4b0b") })
        .toArray()
        .then(docs => {
            console.log("Todos:");
            console.log(JSON.stringify(docs, undefined, 2));
        }, err => {
            console.log("Unable to fetch Todos", err);
        });

    db
        .collection("Todos")
        .find()
        .count()
        .then(count => {
            console.log("Todos count: ", count);
        }, err => {
            console.log("Unable to fetch Todos", err);
        });*/


    db
        .collection("Users")
        .find({ name: 'Moore' })
        .toArray()
        .then(docs => {
            console.log("Todos: ", JSON.stringify(docs, undefined, 2));
        }, err => {
            console.log("Unable to fetch Todos", err);
        });

    //client.close();
})