var express = require('express');
var mongo = require('../db/mongo_connect.js');
var router = express.Router();

// Provided - do not modify
var credentalsAreValid = function (username, password) {
};

// Implement the routes.
router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/', function (req, res, next) {
  mongo.database().collection('User').find({username: req.body.username}).toArray(function(err,result){
    if (result.length !== 0 && result[0].password === req.body.password){
      req.session.isAuthenticated = true;
      res.redirect('/user/'+req.body.username);
    } else {
      res.redirect('/');
    }
  });
});

router.post('/NewUser', function (req, res, next) {
  mongo.database().collection('User').find({username: req.body.username}).toArray(function(err,result){
  	if (err) throw err;
    if (result.length === 1) {
      console.log(result);
      res.redirect('/');
    } else {
      mongo.database().collection('User').insertOne({username: req.body.username, password : req.body.password, friends : [], status: [], profile: 'undefined', info : 'Talk about yourself'}, function(err, resu) {
        req.session.isAuthenticated = true;
        res.redirect('/user/'+req.body.username);
      });
    }
  });
});

module.exports = router;
