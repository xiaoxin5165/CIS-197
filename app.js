import express from 'express';
import path from 'path';
import ejs from 'ejs';

var mongo = require('./db/mongo_connect.js'); // Setting up mongodb and file
var uuid = require('node-uuid');
var fileUpload = require('express-fileupload');

let app = module.exports = express();
const port = process.env.PORT || 3000;

app.set('port', port);

app.set('views', __dirname + '/views');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

var generateCookieSecret = function () { // For cookie session
  return 'iamasecret' + uuid.v4();
};

app.use(fileUpload()); // allows file upload

var cookieSession = require('cookie-session');

app.use(cookieSession({secret : generateCookieSecret()}));

var bodyParser = require('body-parser'); // Allow parsing json objects

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : true}));

var login = require('./routes/login');

app.use('/', login); // handles login

app.get('/user/:username', function (req, res) { // when a user logs in
  mongo.database().collection('User').find({username: req.params.username}).toArray(function (err,result) {
    if (err) throw err;
    app.set('user', result[0]._id);
    res.render('index');
  });
});

app.get('/userinfo', function (req, res) { // fetches user info when logging in
  mongo.database().collection('User').find({_id: app.get('user')}).toArray(function (err,result) {
    if (err) throw err;
    if (result.length === 1) {
      res.send(result[0]);
    } else {
      res.status(500);
    }
  });
});

app.post('/DeleteUser', function (req, res) { // Delete the user 
  mongo.database().collection('User').find({username: req.body.username}).toArray(function (err,result){
    if (err) throw err;
    if (result.length !== 0 && result[0].password === req.body.password){
      mongo.database().collection('User').remove(result[0]);
      res.send('account was deleted');
    } else {
      res.send('No Account with the Following info was found')
    }
  });
});

app.get('/usercomment/:client', function (req,res) { // get comments of the page of the current user
  mongo.database().collection('User').find({username: req.params.client}).toArray(function (err,result) {
    if (result.length === 0) res.send('user does not exist');
    if (err) throw err;
    res.send(result[0].status);
  });
});

app.post('/usercomment/:client/:from', function (req,res) { // posting a comment
  mongo.database().collection('User').find({username: req.params.client}).toArray(function (err,result) {
    var commentset = result[0].status;
    commentset.push({text: req.body.comment, from: req.params.from, liked: []});
    mongo.database().collection('User').updateOne({username: req.params.client}, {$set :{status :commentset}});
    if (err) throw err;
    res.send(result[0].status);
  });
});

app.post('/deletecomment/:client', function (req, res) {
  mongo.database().collection('User').find({username: req.params.client}).toArray(function (err,result) {
    var commentset = result[0].status;
    commentset.splice(req.body.index, 1);
    mongo.database().collection('User').updateOne({username: req.params.client}, {$set :{status :commentset}});
    if (err) throw err;
    res.send(result[0].status);
  }); // delete a comment
});

app.post('/likecomment/:client/:from', function (req, res) { // like a comment
  mongo.database().collection('User').find({username: req.params.client}).toArray(function (err,result) {
    if (err) throw err;
    var commentset = result[0].status;
    if (req.body.like) {
      if (commentset[req.body.index].liked === undefined) {
        commentset[req.body.index].liked = [];
      }
      commentset[req.body.index].liked.push(req.params.from);
    } else {
      var indexof = commentset[req.body.index].liked.indexOf(req.params.from);
      commentset[req.body.index].liked.splice(indexof, 1);
    } 
    mongo.database().collection('User').updateOne({username: req.params.client}, {$set :{status :commentset}});
    res.send(result[0].status);
  });
});

app.post('/userprofile/:client', function (req, res) { // when user wants to save a new picture
  mongo.database().collection('User').find({username: req.params.client}).toArray(function (err, result) {
    if (err) throw err;
    mongo.database().collection('User').updateOne({username: req.body.user}, {$set :{profile :req.files.image}});
    res.send(req.files.image);
  });
});

app.get('/alluser/:currentuser', function (req, res) { // when user wants all users for status
  mongo.database().collection('User').find({}).toArray(function (err, result) {
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

app.get('/userprofile/:client', function (req, res) { // when user wants profile info
  mongo.database().collection('User').find({username: req.params.client}).toArray(function (err, result) {
    if (err) throw err;
      res.send(result);
  });
});

app.post('/userproinfo', function (req, res) { // when user wants profile information
  mongo.database().collection('User').find({username: req.body.user}).toArray(function (err, result) {
    if (err) throw err;
    mongo.database().collection('User').updateOne({username: req.body.user}, {$set :{info :req.body.text}});
    res.send(true);
  });
});

app.listen(app.get('port'), () => { // listening to poo
  console.log(`Express game server listening on port ${port}`);
});

