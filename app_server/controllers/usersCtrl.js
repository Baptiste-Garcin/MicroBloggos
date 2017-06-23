/**
* @Date:   11-Jan-2017
* @Filename: usersCtrl.js
* @Last modified time: 15-Jan-2017
* @License: MIT
*/
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/users');
var passport = require('passport');




module.exports.list = function(req, res) {
	User.listMembers(req, res, function(members) {
		res.status(200).json(members);
	});
}

module.exports.show = function(req, res) {
	User.getMember(req.params.id, function(currentMember) {
		res.status(200).json(currentMember);
	});
}

module.exports.update = function(req, res){
	if(req.body.name && req.body.email.match(/\S+@\S+\.\w{1,4}/) && req.body.password == req.body.password_confirmation)
	{
		User.updateUser(req.params.id, req.body.name, req.body.email, req.body.password, function(err)
		{
			if(err)
			res.status(400).json({"success":false, "message": err.message});
			else
			{
				User.findOne({"_id": req.params.id}, function(err, user){
					var token = user.generateJwt();
					res.status(200).json({success:true, message: "Update done", token:token});
				});
			}
		});
	}
	else
	res.status(400).json({"success":false, "message":"Missing parameters"});
}

module.exports.remove = function(req, res){
	User.delete(req.params.id, function(err){
		if(err)
			res.status(400).json({"success":false, "message": err.message});
		else
			res.status(200).json({"success":true, "message":"Delete done"})
	});
}

// module.exports.readUser = function(req, res) {
// 	// If no user ID exists in the JWT return a 401
// 	if (!req.payload._id) {
// 		res.status(401).json({
// 			"message" : "UnauthorizedError: private profile"
// 		});
// 	} else {
// 	// Otherwise continue
// 		User.findById(req.payload._id)
// 		.exec(function(err, user) {
// 			res.status(200).json(user);
// 		});
// 	}
// }
