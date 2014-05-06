/* globals require, module */ 

'use strict'; 

var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'), 
	SALT_WORK_FACTOR = 10; 

var userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true, index: true },
	password: { type: String, required: true },
	joined: { type: Date, default: Date.now },
	role: { type: String, default: 'Author'},
	meta: {
		fullname: String, 
		website: String, 
	}
});

// add methods, static, virtuals, etc. to userSchema here

// remove spaces, invalid characters from username
// userSchema.pre('save', function(next) {
// 	// code here
// 	next(); 
// }); 

// Hash password with bcrypt before save
userSchema.pre('save', function(next) {
	var user = this; 
	if (!user.isModified('password')) return next; 
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err); 
			user.password = hash; 
			next(); 
		}); 
	}); 
}); 

// Returns true/false to verify password
userSchema.method('verifyPassword', function(candidate, callback) {
	bcrypt.compare(candidate, this.password, function(err, isMatch) {
		if (err) return callback(err); 
		callback(null, isMatch); 
	}); 
}); 

module.exports = mongoose.model('User', userSchema);