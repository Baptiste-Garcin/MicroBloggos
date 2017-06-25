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
	mongoose.connect('mongodb://127.0.0.1/mydb', function (err) {
		if (err) {
		throw err;
}
		console.log('DB connect');
	});
}
