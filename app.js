import express from 'express';
import path from 'path';
import ejs from 'ejs';
import * as initialState from './public/initialState';


var mongo = require('./db/mongo_connect.js');
var uuid = require('node-uuid');
//var MongoClient = require('mongodb').MongoClient;
//var MONGO_URI = 'mongodb://localhost:27017/fb';


let app = module.exports = express();
const port = process.env.PORT || 3000;

app.set('port', port);

//MongoClient.connect(MONGO_URI, function(err, db) {
//   if (err) return console.log(err);
//    if (err) return console.log("there is an error");

  // connected database is 'db'
  app.set('views', __dirname + '/views');
  app.engine('html', ejs.__express);
  app.set('view engine', 'html');

  // Host static files on URL path
  app.use(express.static(path.join(__dirname, 'public')));

  // Use express Router middleware for root path
  // app.use(app.router);

  var generateCookieSecret = function () {
      return 'iamasecret' + uuid.v4();
  };

    //var addDb = function(req, resp, next){
    //  req.mongoDb = db;
    //  next();
    //};

  var cookieSession = require('cookie-session');

  app.use(cookieSession({secret : generateCookieSecret()}));

  var bodyParser = require('body-parser');

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({extended : true}));

  var login = require('./routes/login');

  app.use('/', login);

  app.get('/user/:username', function (req, res) {
    mongo.database().collection('User').find({username: req.params.username}).toArray(function(err,result){
      //app.locals.user = result[0]._id;
      app.set('user', result[0]._id);
      res.render('index');
    });

  });

  app.get('/userinfo', function (req, res) {
    console.log('Someone wants user info');
    mongo.database().collection('User').find({_id: app.get('user')}).toArray(function(err,result){
      if (result.length === 1) {
        console.log(result[0]);
        res.send(result[0]);
      } else {
        console.log('Error');
        res.status(500);
      }
    });
  });

  app.post('/userprofile', function( req, res) {
    console.log(req.image);
    console.log(req.body);
  });

  app.post('/userproinfo', function(req, res) {
    console.log(req.body);
	mongo.database().collection('User').find({username: req.body.user}).toArray(function(err, result){
	  if (err) throw err;
	  console.log(result[0]);
	  mongo.database().collection('User').updateOne({username: req.body.user}, {$set :{info :req.body.text}});
	  console.log('im done inserting');
	  res.send(true);
	});
  });

  app.get('/export', (req, res) => {
    res.json(JSON.parse(req.query.data));
  });

  // Start server
  app.listen(app.get('port'), () => {
    console.log(`Express game server listening on port ${port}`);
  });

  //db.close();
//})

// Use the EJS rendering engine for HTML located in /views
