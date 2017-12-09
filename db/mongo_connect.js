var MongoClient = require('mongodb').MongoClient;
var MONGO_URI = 'mongodb://localhost:27017/fb';

var database;

MongoClient.connect(MONGO_URI, function (err, db) {
  if (err) throw err;
  database = db;
});

module.exports.database = function () {return database;};