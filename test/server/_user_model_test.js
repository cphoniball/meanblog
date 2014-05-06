/* globals require, module, console */ 

'use strict'; 

var User = require('../../server/models/users.js'), 
	mongoose = require('mongoose'); 

var db; 

module.exports = {
	setUp: function(callback) {
		db = mongoose.connect('mongodb://localhost/meanblog'); 

		mongoose.connection.once('open', function(err) {
			if (err) return console.error(err); 

			User.remove({ username: 'testUser' }, function(err) {
				if (err) return console.error(err); 
					
				var newUser = new User({
					username: 'testUser', 
					password: 'testpass', 
					meta: {
						fullname: 'Test User',
						website: 'http://test.com'
					}
				});

				newUser.save(function(err) {
					if (err) return console.error(err); 
					callback(); 
				}); 	
			}); 
		}); 
	},

	tearDown: function(callback) {
		db.disconnect(function() {
			callback(); 
		}); 
	},

	passwordHashingMatchesValid: function(test) {
		User.findOne({ username: 'testUser' }, function(err, user) {
			if (err) return console.error(err); 
			// test matching password 
			user.verifyPassword('testpass', function(err, isMatch) {
				if (err) return console.error(err); 
				test.ok(isMatch, 'testPass matches hashed password');
				test.done();  
			}); 
		}); 
	},

	passwordHashingDoesNotMatchInvalid: function(test) {
		User.findOne({ username: 'testUser' }, function(err, user) {
			if (err) return console.error(err); 
			// test matching password 
			user.verifyPassword('notcorrect', function(err, isMatch) {
				if (err) return console.error(err); 
				test.equal(isMatch, false, 'notcorrect does not match hashed password');
				test.done();  
			}); 
		}); 	
	}
};