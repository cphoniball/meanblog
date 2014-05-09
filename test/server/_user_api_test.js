/* globals require, module, console */ 

'use strict'; 

var request = require('request'), 
	mongoose = require('mongoose'),
	User = require('../../server/models/users'),
	CONFIG = require('../../config'), 
	ENDPOINT = CONFIG.BLOGURL + '/users', 
	TESTUSER = 'johndoe'; 

var db;

module.exports = {
	setUp: function(callback) {
		db = mongoose.connect('mongodb://localhost/' + CONFIG.DATABASE);

		mongoose.connection.once('open', function(err) {
			if (err) return console.error(err); 

			User.remove({ username: TESTUSER }, function(err) {
				if (err) return console.error(err); 
				callback(); 	
			}); 
		}); 
	}, 

	tearDown: function(callback) {
		db.disconnect(callback); 
	},

	getRetrievesUsers: function(test) {
		var bob = new User({
			username: 'bob', 
			password: 'somepassword', 
			meta: {
				fullname: 'Bob Lastname', 
				website: 'http://something.com'
			}
		}); 

		User.remove({ username: 'bob' }, function(err) {
			if (err) return console.error(err);
			bob.save(function(err) {
				if (err) return console.error(err); 
				request({
					url: ENDPOINT, 
					method: 'GET', 
					qs: {
						username: 'bob'
					}, 
					json: {} // parses body response as json
				}, function(err, res, body) {
					if (err) return console.error(err); 
					test.ok(body[0].username, 'bob', 'Valid request to GET /user returns correct user'); 
					test.ok(body[0].meta.fullname, 'Bob Lastname', 'Valid request to GET /user contains correct meta information'); 
					User.findOneAndRemove({ username: 'bob' }, function(err) {
						if (err) return console.error(err); 
						test.done(); 
					}); 
				});
			}); 	 
		}); 
		
	},

	postCreatesUser: function(test) {
		request({
			url: ENDPOINT, 
			method: 'POST',
			json: {
				username: TESTUSER, 
				password: 'heresapassword', 
				meta: {
					fullname: 'John Doe', 
					website: 'http://example.com'
				}
			}	
		}, function(err, res, body) {
			if (err) return console.error(err); 
			test.equal(res.statusCode, 200, 'Valid data to POST /users returns status code 200'); 
			test.equal(body.username, TESTUSER, 'Valid data to POST /users return new user name'); 
			test.notEqual(body.password, 'heresapassword', 'Valid data to POST /users returns hashed password');
			User.findOne({ username: TESTUSER }, function(err, user) {
				if (err) return console.error(err); 
				test.equal(user.username, TESTUSER, 'Mongoose query returns correct user'); 
				test.done(); 				
			}); 
		}); 
	},

	putUpdatesUser: function(test) {
		var tom = new User({
			username: 'tom', 
			password: 'something'
		}); 

		tom.save(function(err) {
			if (err) return console.error(err); 
			request({
				url: ENDPOINT, 
				method: 'PUT', 
				json: {
					conditions: {
						username: 'tom' 
					},
					update: {
						meta: {
							fullname: 'Tom Lastname', 
							website: 'http://example.com'
						}
					}
				}
			}, function(err) {
				if (err) return console.error(err); 
				User.findOne({ username: 'tom' }, function(err, user) {
					if (err) return console.error(err); 
					test.ok(user.username, 'tom', 'Updated user returns same username'); 
					test.ok(user.meta.fullname, 'Tom Lastname', 'Updated user returns updated full name'); 
					user.remove(function(err) {
						if (err) return console.error(err); 
						test.done(); 
					}); 
				}); 
			}); 		
		}); 
		
	}

	// test other CRUD functionality down here

};