const mongodbclient = require('mongodb').MongoClient;

const assert = require('assert');

const url = 'mongodb://localhost:27017/';

const dbname = 'express';

const dbopp = require('./ops');


mongodbclient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

   dbopp.insertDocument(db, { name: "akarm", description: "lives in lahore"},
        "expressnode")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dbopp.findDocuments(db, "expressnode");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dbopp.updateDocument(db, { name: "akarm" },
                    { name:"akaram",description: "moved to sydney" }, "expressnode");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dbopp.findDocuments(db, "expressnode");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("expressnode");
        })
       
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));