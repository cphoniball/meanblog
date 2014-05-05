var mongoose = require('mongoose');


// Setting up post schema and model
var postSchema = mongoose.Schema({
	title: { type: String, default: 'Untitled' },
	tags: [String],
	created: { type: Date, default: Date.now },
	lastUpdated: { type: Date, default: Date.now },
	url: String, // need to figure out how to set URL here
	content: String
});

// TODO: Set up a pre hook to set the URL of the post properly 

module.exports = mongoose.model('Post', postSchema);