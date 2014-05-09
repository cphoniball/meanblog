/* globals require, exports */ 

'use strict'; 

var User = require('../models/users.js'),
	_ = require('lodash');

// TODO: need to figure out where to set up authentication middleware here
var handleError = function(err, res) {
	return res.send(500, { error: 'Internal database error ' + err }); 
};

exports.get = function(req, res) {
	if (_.isPlainObject(req.query) && !_.isEmpty(req.query)) {
		User.find(req.query, function(err, users) {
			if (err) return handleError(err, res);
			res.send(users);  
		}); 
	} else {
		User.find(function(err, users) {
			if (err) return handleError(err, res);
			res.send(users);  
		}); 
	}
};

// On POST request, create a single user and send it back as response
exports.create = function(req, res) {
	if (_.isPlainObject(req.body) && !_.isEmpty(req.body)) {
		var newUser = new User(req.body); 
		newUser.save(function(err) {
			if (err) res.status(500).send('Internal database error'); 
			res.send(newUser); 
		}); 
	} else {
		res.status(400).send('No params passed to POST /users'); 
	}
};

// 
exports.update = function(req, res) {
	if (_.isPlainObject(req.body) && !_.isEmpty(req.body)) { 
		User.update(req.body.conditions, req.body.update, req.body.options || { multi: true }, function(err, numAffected, raw) {
			if (err) res.status(500).send('Internal database error');
			User.find(req.body.conditions, function(err, users) {
				if (err) res.status(500).send('Internal database error');
				res.send(users); 
			}); 
		}); 
	} else {
		res.status(400).send('Conditions or update params left out of PUT to /users');
	}
};

exports.delete = function(req, res) {
	if (_.isPlainObject(req.body) && !_.isEmpty(req.body)) { 
		User.find(req.body, function(err, docs) { // find document so it can be returned to request
			User.remove(req.body, function(err) {
				if (err) res.status(500).send('Internal database error'); 
				res.send(docs); 
			}); 		
		}); 
	} else {
		res.status(400).send('No request params sent to DELETE /users'); 
	}
};