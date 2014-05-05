var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	name: String,
	joined: { type: Date, default: Date.now },
	role: { type: String, default: 'Author'}
});

// add methods, static, virtuals, etc. to userSchema here

module.exports = mongoose.model('User', userSchema);