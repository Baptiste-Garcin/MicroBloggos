/**
* @Author: Ernest
* @Date:   12-Jan-2017
* @Project: MEAN_rush
* @Filename: post.js
* @Last modified by:   Ernest
* @Last modified time: 12-Jan-2017
* @License: MIT
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* Declaration du Schema
*/

var postSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	author: {type:  Schema.Types.ObjectId, ref:'User'},
	created_at: {
		type: Date
	},
	updated_at: {
		type: Date
	}
}, {collection:"posts"});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;


module.exports.add = function(contentToAdd, authorToAdd, callback) {
	var postToAdd = new Post({
		content: contentToAdd,
		author: authorToAdd,
		created_at: new Date(),
		updated_at: new Date()
	});

	postToAdd.save(function(err) {
		if (err)
		callback( {"success": false, message: err.message} )
		else
		{
			callback({"success": true, message:"Post added", id: postToAdd._id});
		}
	});
}

module.exports.listPosts = function(req, res, callback) {
	Post.aggregate([ {"$sort":{"created_at": -1}},
	{ $lookup: {localField: "author",
				from: "users",
				foreignField: '_id',
				as: "userinfo"}},
	{$unwind:'$userinfo'},
	{"$project": {"content": 1, "created_at":1, "userinfo.name": 1, "userinfo._id":1}}])
	.exec(function(err, results){
		callback(results);
	});
}


module.exports.getPost = function(id, author, callback) {
	Post.findOne({"_id" : id, "author": author}, function(err, post){
		if (err)
		callback({"success":false, message:err.message});
		else
		callback(post);
	});
}


module.exports.delete = function(id, callback){
	console.log("test");
	Post.find({_id:id}).remove(function(err){
		if(err)
		callback(err);
		else
		{
			var response = {success: true,message:'post deleted'}
			callback(response);
		}
	})
}
