/**
* @Author: Ernest
* @Date:   12-Jan-2017
* @Project: MEAN_rush
* @Filename: authCtrl.js
* @Last modified by:   Ernest
* @Last modified time: 12-Jan-2017
* @License: MIT
*/

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.login = function(req, res)
{
	passport.authenticate('local', function(err, user, info){
		var token;

		if(err)
		{
			res.status(404).json({"success" : false, message:err.message});
			return
		}

		if(user)
		{
			token = user.generateJwt();
			console.log(token);
		  	res.status(200).json({"success": true, "message": "User authentified", "token" : token});
		}
		else
			res.status(401).json({"success": false, "message": "User unknown"});
	})(req, res);
}


exports.logout = function(req, res) {
	req.logout();
}
