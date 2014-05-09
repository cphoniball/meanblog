var Post = require('../models/posts.js'), 
	_ = require('lodash');

// Returns a list of post objects or queries for single post, if query string is provided
exports.get = function(req, res) {
	if (_.isPlainObject(req.query) && !_.isEmpty(req.query)) { // if query string is provided
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
	if (_.isPlainObject(req.body) && !_.isEmpty(req.body)) {
		Post.update(req.body.conditions, req.body.update, function(err, numUpdated, raw) {
			Post.find(req.body.update, function(err, docs) {	
				if (err) return res.status(500).send('Internal database error');
				res.send(docs);
			});	
		}); 
		
	} else {
		res.status(400).send('No params passed to PUT /posts');
	}
};

// TODO: Should expose an update by method here


// Delete a post by arbitrary JSON included in the body of the request
exports.delete = function(req, res) {
	if (_.isPlainObject(req.body) && !_.isEmpty(req.body)) {
		Post.find(req.body, function(err, docs) {
			Post.remove(req.body, function(err) {
				if (err) return console.error(err);
				res.send(docs);
			});
		});
	} else {
		res.status(400).send('No parameters passed to DELETE /posts');
	}
};

// Delete a single post object by ID
exports.deleteById = function(req, res) {
	Post.findByIdAndRemove(req.params.id, function(err, docs) {
		if (err) return console.error(err);
		res.send(docs);
	});
};