var User = require('../models/users.js').
	_ = require('lodash');

// TODO: need to figure out where to set up authentication middleware here

var handleError = function(err, res) {
	return res.send(500, { error: 'Internal database error ' + err }); 
}

exports.get = function(req, res) {
	if (_.isPlainObject(req.body) && !_.isEmpty(req.body)) {
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

// On POST request, create a single user
exports.create = function(req, res) {

};

exports.update = function() {

};

exports.delete = function(req, res) {

};