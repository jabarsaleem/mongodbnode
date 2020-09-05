const mongodbclient = require('mongodb').MongoClient;

const assert = require('assert');

const url = 'mongodb://localhost:27017/';

const dbname= 'express';

mongodbclient.connect(url, (err, client) => {

    assert.equal(err, null);

    console.log("connected");

    const db = client.db(dbname);

   

    const collection = db.collection("expressnode");

    collection.insertOne({ "name": "ali", "description": "ali is from lahore" },
        (err, result) => {
            assert.equal(err, null);

            console.log("After Insert:\n");
            console.log(result.ops);

            collection.find({}).toArray((err, docs) => {
                assert.equal(err, null);

                console.log("Found:\n");
                console.log(docs);
                client.close();


            });
        });

});