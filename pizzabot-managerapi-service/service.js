var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var MongoURL = process.env.MONGODB_URL | 'mongodb://localhost:27017/pizzabot';


app.get('/api/humans', function (req, res) {
    MongoClient.connect(MongoURL, function(err, db) {
        assert.equal(null, err);

        var collection = db.collection('humans');
        collection.find({}).toArray(function(err, docs) {
            res.json(docs);
            db.close();
        });
    });
});

app.get('/api/clear', function(req, res) {
    MongoClient.connect(MongoURL, function(err, db) {
        assert.equal(null, err);

        var collection = db.collection('humans');
        collection.deleteMany({}, function(err, docs) {
            res.sendStatus(200);
            db.close();
        });
    });
});

app.listen(process.env.PORT || 8080);
