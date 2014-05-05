var mongoose = require('mongoose');


// Setting up post schema and model
var postSchema = mongoose.Schema({
	title: String,
	tags: [String],
	created: { type: Date, default: Date.now },
	lastUpdated: { type: Date, default: Date.now },
	url: String, // need to figure out how to set URL here
	content: String
});

module.exports = mongoose.model('Post', postSchema);