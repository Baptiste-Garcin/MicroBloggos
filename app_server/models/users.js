/**
* @Author: Ernest
* @Date:   11-Jan-2017
* @Project: MEAN_rush
* @Filename: users.js
* @Last modified by:   Ernest
* @Last modified time: 15-Jan-2017
* @License: MIT
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

/**
* Declaration du Schema
*/

var userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	created_at: {
		type: Date
	},
	updated_at: {
		type: Date
	},
	posts_ids: [{ type: Schema.Types.ObjectId, ref: 'Post' }]

}, {collection:"users"});

/**
* Methode de schema chiffrant le password et gérant le salt (Utilisée dans Add)
*/

userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

/**
* Methode de schema verifiant le passport (Utilisée dans la stratégie Passport)
*/

userSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.password === hash;
};

/**
* Methode de schema générant un token (Utilisée dans la stratégie Passport et dans le login)
*/

userSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		created_at: this.created_at,
		exp: parseInt(expiry.getTime() / 1000),
	}, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

var User = mongoose.model('User', userSchema);
module.exports = User;

/**
* Methode de schéma ajoutant une entrée dans la collection User (utilisée dans le register)
*/

module.exports.add = function(nameToAdd, emailToAdd, passwordToAdd, callback){
	var userToAdd = new User({
		name : nameToAdd,
		email : emailToAdd,
		updated_at : new Date(),
		created_at : new Date()
	});
	userToAdd.setPassword(passwordToAdd)


	userToAdd.save(function(err){
		if(err)
		callback({"success": false, message: err.message});
		else
		{
			var token = userToAdd.generateJwt();
			callback({"success": true, message:"User added", "token":token});
		}
	});
}

/**
* Liste les utilisateurs (Utilisée sur la route /list)
*/

module.exports.listMembers = function(req, res, callback) {
	User.find({},{password:0, salt:0}, function(err, members) {
		if (err)
		callback({"success":false, message:err.message});

		callback(members);
	});
};

/**
* Recherche un utilisateur (Utilisée sur la route /user/:email)
*/

module.exports.getMember = function(id, callback) {
	User.findOne({"_id" : id}, function(err, user){
		if (err)
		callback({"success":false, message:err.message});
		else
		callback(user);
	});
}

module.exports.updateUser = function(id, name, email, password, callback)
{
	if(password == undefined)
	{
		var updated_at = new Date();
		User.update({"_id" : id},{$set:{name:name, email:email, updated_at:updated_at}}, function(err){
			callback(err);
		});
	}
	else
	{
		var updated_at = new Date();

		var salt = crypto.randomBytes(16).toString('hex');
		var password = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');

		console.log(salt);
		console.log(password);

		User.update({"_id" : id}, {$set:{name:name, email:email, password:password, salt:salt, updated_at:updated_at}}, function(err){
			callback(err);
		});
	}
}

module.exports.delete = function(id, callback){
	User.findByIdAndRemove(id, function (err){
		if(err)
			callback(err);
		else
		{
			var response = {success: true,message:'user deleted'}
			callback(response);
		}
	});
}

module.exports.linkPostToUser = function(postId, user_id, callback) {
	User.update({"_id": user_id}, {$push: {posts_ids: postId}}, function(err) {
		if(err)
			callback(err);
		else
		{
			var response = {success: true,message:'Post added'};
			callback(response);
		}
	});
}
