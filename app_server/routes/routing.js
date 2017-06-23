/**
* @Author: Ernest
* @Date:   11-Jan-2017
* @Project: MEAN_rush
* @Filename: routing.js
* @Last modified by:   Ernest
* @Last modified time: 15-Jan-2017
* @License: MIT
*/

var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/usersCtrl');
var registerCtrl = require('../controllers/registerCtrl');
var authCtrl = require('../controllers/authCtrl');
var postCtrl = require('../controllers/postCtrl');


var jwt = require('express-jwt');
var auth = jwt({
	secret: 'MY_SECRET',
	userProperty: 'payload'
});

var path = require('path')





/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Test' });
// });

/**
* Login/Logout/Register
*/

router.post('/register', registerCtrl.register);

router.post('/login', authCtrl.login);

router.post('/logout', authCtrl.logout);

/**
* CRUD User
*/

router.get('/user', usersCtrl.list);

router.get('/user/:id', usersCtrl.show);

router.patch('/user/:id', usersCtrl.update);

router.delete('/user/:id', usersCtrl.remove);

/**
* CRUD Post
*/

router.post('/post', postCtrl.post);

router.get('/post', postCtrl.list);

// router.get('/post/:id', postCtrl.show);
//
// router.patch('/post/:id', postCtrl.update);
//
router.delete('/post/:id', postCtrl.remove)
//
// router.get('*', function(req, res) {
// 	res.sendfile('../views/index.ejs');
// });

// router.delete('/post/:id', postCtrl.remove);


module.exports = router;
