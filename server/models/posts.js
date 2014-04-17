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

var Post = mongoose.model('Post', postSchema);

// Returns a list of post objects or queries for single post, if query string is provided
exports.get = function(req, res) {
	if (isNonEmptyObject(req.query)) { // if query string is provided
		Post.find(req.query, function(err, docs) {
			if (err) return console.error(err); 
			res.send(docs); 
		}); 
	} else {
		Post.find(function(err, docs) {
			if (err) return console.error(err);
			res.send(docs);
		});	
	}
}; 
 
// Create a single post object 
exports.create = function(req, res) {
	var post = new Post({
		title: req.body.title,
		tags: req.body.tags,
		content: req.body.content
	});

	post.save(function(err) {
		if (err) return console.error(err);
		res.send(post);
	});
}; 

// Update a post 
exports.update = function(req, res) {
	if (isNonEmptyObject(req.body)) {
		Post.findOneAndUpdate(req.body.conditions, req.body.update, function(err, doc) {
			if (err) return console.error(err); 
			res.send(doc); 
		}); 
	} else {
		res.status(500).send('No params passed to PUT /posts'); 
	}
};

// Delete a post by arbitrary JSON included in the body of the request
exports.delete = function(req, res) {
	if (isNonEmptyObject(req.body)) {
		Post.find(req.body, function(err, docs) {
			Post.remove(req.body, function(err) {
				if (err) return console.error(err); 	
				res.send(docs); 
			}); 
		});
	} else {
		res.status(500).send('No parameters passed to DELETE /posts'); 	
	}
}; 

// Delete a single post object by ID
exports.deleteById = function(req, res) {
	Post.findByIdAndRemove(req.params.id, function(err, docs) {
		if (err) return console.error(err); 
		res.send(docs);
	}); 
};

// Helper functions

function isNonEmptyObject(obj) {
	return typeof(obj) === 'object' && obj !== {};
}