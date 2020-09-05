const mongodbclient = require('mongodb').MongoClient;

const assert = require('assert');

const url = 'mongodb://localhost:27017/';

const dbname = 'express';

const dbopp = require('./ops');


mongodbclient.connect(url, (err, client) => {

    assert.equal(err, null);

    console.log("connected");

    const db = client.db(dbname);


    dbopp.insertDocument(db,{ name: "javed", description: "lives in lahore" },
        "expressnode", (result) => 
        {
            console.log("Insert Document:\n", result.ops);

            dbopp.findDocuments(db, "expressnode", (docs) => 
            {
                console.log("Found Documents:\n", docs);

                dbopp.updateDocument(db, { name: "javed" },
                    { name:"asad",description: "Moved to islamabad" }, "expressnode",
                    (result) => 
                    {
                        console.log("Updated Document:\n", result.result);

                        dbopp.findDocuments(db, "expressnode", (docs) => 
                        {
                            console.log("Found Updated Documents:\n", docs);

                            
                        });
                    });
            });
        });

});