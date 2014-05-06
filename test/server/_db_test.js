/* globals require, exports, console */ 

'use strict'; 

var mongoose = require('mongoose'); 

var db;

exports.setUp = function(callback) {
	db = mongoose.connect('mongodb://localhost/meanblog'); 
	db.connection.once('open', function(err) {
		if (err) return console.error(err); 
		callback(); 
	}); 
};

exports.tearDown = function(callback) {
	db.disconnect(function() {
		callback(); 
	}); 
};

exports.testDbConnection = function(test) {
	db.connection.on('error', console.error.bind(console, 'connection error:') ); 
	test.ok(true, 'Mongoose established connection to local database');
	test.done(); 
};