/* globals require, module, console */ 

'use strict'; 

var request = require('request'), 
	mongoose = require('mongoose'),
	User = require('../../server/models/users'),
	CONFIG = require('../../config'), 
	ENDPOINT = CONFIG.BLOGURL + '/users'; 

var db;

module.exports = {
	setUp: function(callback) {
		db = mongoose.connect('mongodb://localhost/' + CONFIG.DATABASE);
		mongoose.connection.once('open', function(err) {
			if (err) return console.error(err); 

			User.remove({ username: 'johndoe' }, function(err) {
				if (err) return console.error(err); 
				callback(); 	
			}); 
		}); 
	}, 

	tearDown: function(callback) {
		db.disconnect(callback); 
	},

	postCreatesUser: function(test) {
		request({
			url: ENDPOINT, 
			method: 'POST',
			json: {
				username: 'johndoe', 
				password: 'heresapassword', 
				meta: {
					fullname: 'John Doe', 
					website: 'http://example.com'
				}
			}	
		}, function(err, res, body) {
			if (err) return console.error(err); 
			test.equal(res.statusCode, 200, 'Valid data to POST /users returns status code 200'); 
			test.equal(body.username, 'johndoe', 'Valid data to POST /users return new user name'); 
			test.notEqual(body.password, 'heresapassword', 'Valid data to POST /users returns hashed password');
			User.findOne({ username: 'johndoe' }, function(err, user) {
				if (err) return console.error(err); 
				test.equal(user.username, 'johndoe', 'Mongoose query returns correct user'); 
				test.done(); 				
			}); 
		}); 
	}

	// test other CRUD functionality down here

};