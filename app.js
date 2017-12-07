import express from 'express';
import path from 'path';
import ejs from 'ejs';
import * as initialState from './public/initialState';


var mongo = require('./db/mongo_connect.js');
var uuid = require('node-uuid');
//var MongoClient = require('mongodb').MongoClient;
//var MONGO_URI = 'mongodb://localhost:27017/fb';


var fileUpload = require('express-fileupload');



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


  app.use(fileUpload());

  var cookieSession = require('cookie-session');

  app.use(cookieSession({secret : generateCookieSecret()}));

  var bodyParser = require('body-parser');

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({extended : true}));


  var login = require('./routes/login');

  app.use('/', login);

  app.get('/user/:username', function (req, res) { // when a user logs in
    mongo.database().collection('User').find({username: req.params.username}).toArray(function(err,result){
      //app.locals.user = result[0]._id;
      app.set('user', result[0]._id);
      res.render('index');
    });

  });

  app.get('/userinfo', function (req, res) { // when the user wants all user info
    mongo.database().collection('User').find({_id: app.get('user')}).toArray(function(err,result){
      if (result.length === 1) {
        res.send(result[0]);
      } else {
        console.log('Error');
        res.status(500);
      }
    });
  });

  app.get('/usercomment/:client', function(req,res) {
  	mongo.database().collection('User').find({username: req.params.client}).toArray(function(err,result){
  	  console.log('im getting things from client ', result[0]);
  	  if (err) throw err;
  	  res.send(result[0].status);
  	});
  });

  app.post('/usercomment/:client/:from', function(req,res) {
  	mongo.database().collection('User').find({username: req.params.client}).toArray(function(err,result){
  	  var commentset = result[0].status;
  	  commentset.push({text: req.body.comment, from: req.params.from, liked: []});
  	  mongo.database().collection('User').updateOne({username: req.params.client}, {$set :{status :commentset}});
  	  if (err) throw err;
  	  res.send(result[0].status);
  	});
  });

  app.post('/likecomment/:client/:from', function(req, res){


	mongo.database().collection('User').find({username: req.params.client}).toArray(function(err,result){
  	  var commentset = result[0].status;
  	  console.log(commentset, req.body.index, req.body.like);
  	  if (req.body.like) {
  	  	if (commentset[req.body.index].liked === undefined) {
  	  	  commentset[req.body.index].liked = [];
  	  	}
		commentset[req.body.index].liked.push(req.params.from);
	  } else {
	  	console.log(commentset);
	  	var indexof = commentset[req.body.index].liked.indexOf(req.params.from);
	  	commentset[req.body.index].liked.splice(indexof, 1);
	  } 
  	  mongo.database().collection('User').updateOne({username: req.params.client}, {$set :{status :commentset}});
  	  if (err) throw err;
  	  res.send(result[0].status);
  	});



  });

  app.post('/userprofile/:client', function( req, res) { // when user wants to save a new picture
	mongo.database().collection('User').find({username: req.params.client}).toArray(function(err, result){
	  if (err) throw err;
	  mongo.database().collection('User').updateOne({username: req.body.user}, {$set :{profile :req.files.image}});
	  res.send(req.files.image);
	});
  });

  app.get('/alluser/:currentuser', function(req, res) { // when user wants all users for status
	mongo.database().collection('User').find({}).toArray(function(err, result){
	  if (err) throw err;
	    var arr = [];
	    for (var i = 0; i < result.length; i++){
	      arr.push(result[i].username);
	    }
        var i = arr.indexOf(req.params.currentuser);
        if(i != -1) {
	      arr.splice(i, 1);
		}
	  	res.send(arr);
	});	
  });

  app.get('/userprofile/:client', function( req, res) { // when user wants profile info
  	//console.log(req);
	mongo.database().collection('User').find({username: req.params.client}).toArray(function(err, result){
	  if (err) throw err;
	  	res.send(result);
	});
  });


  app.post('/userproinfo', function(req, res) { // when user wants profile information
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
