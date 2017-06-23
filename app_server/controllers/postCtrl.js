/**
* @Author: Ernest
* @Date:   12-Jan-2017
* @Project: MEAN_rush
* @Filename: postCtrl.js
* @Last modified by:   Ernest
* @Last modified time: 15-Jan-2017
* @License: MIT
*/
var Post = require('../models/posts');
var User = require('../models/users');


module.exports.list = function(req, res) {
	Post.listPosts(req, res, function(posts) {
		res.status(200).json(posts);
	});
}

module.exports.post = function(req, res) {
	if(!req.body.content)
		res.status(400).json( {success: false, fail: "missing content"} );
	else if(req.body.content.length > 140)
		res.status(400).json( {success: false, fail: "there are more than 140 characters"} );
	else
	{

		Post.add(req.body.content, req.body.author, function(response) {
			if(response.success)
			{
				User.linkPostToUser(response.id, req.body.author, function(response) {
				res.status(200).json(response);
				});
			}
		});
	}
}

module.exports.show = function(req, res) {
	Post.getPost(req.params.id, req.params.author, function(response) {
		res.status(200).json(response);
	});
}

module.exports.remove = function(req, res){
	Post.delete(req.params.id, function(err){
		if(err)
			res.status(400).json({"success":false, "message": err.message});
		else
			res.status(200).json({"success":true, "message":"Delete done"})
	});
}
