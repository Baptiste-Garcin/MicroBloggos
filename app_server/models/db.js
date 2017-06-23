/**
* @Author: Ernest
* @Date:   11-Jan-2017
* @Project: MEAN_rush
* @Filename: db.js
* @Last modified by:   baptiste
* @Last modified time: 15-Jan-2017
* @License: MIT
*/



var mongoose = require('mongoose');

module.exports.connect = function(){
	mongoose.connect('mongodb://localhost/mydb', function (err) {
	// mongoose.connect('mongodb://mean_rush:MicroBloggos@81.57.35.10:27017/mydb', function (err) {
		if (err)
		throw err;

		console.log('DB connect');
	});
}
