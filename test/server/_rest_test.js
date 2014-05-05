var request = require('request'); 

exports.postCreatesPost = function(test) {
	var postTitle = 'Post created using post request';
	request({
		url: 'http://localhost:1337/posts',
		method: 'POST',
		json: {
			title: postTitle,
			tags: ['tag one', 'tag two', 'tag three'],
			content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, perspiciatis, rerum provident magnam ipsam fuga adipisci dolores temporibus possimus. Eos, odio dicta neque nemo expedita libero suscipit obcaecati quibusdam ipsa."
		}
	}, function(err, res, body) {
			if (err) return console.error(err);
			test.equal(res.statusCode, 200, 'POST request to http://localhost:1337/posts returns status 200.');
			test.equal(body.title, postTitle, 'POST request returns post object');
			test.done();
		}
	);
}

exports.getRetrievesPosts = function(test) {
	request({ url: 'http://localhost:1337/posts', json: {} }, function(err, res, body) {
		if (err) return console.error(err); 
		test.ok(body.length, 'Get request to /posts returns a list of length > 0'); 
		test.ok(body[0].title, 'First object returned by /posts has a property title'); 
		test.done(); 
	});
};

exports.getWithQueryRetrievesPosts = function(test) {
	request({
		url: 'http://localhost:1337/posts', 
		qs: {
			title: 'Post created using post request'
		},
		json: {} // t`his is required to accept the response as JSON
	}, function(err, res, body) {
		console.log(res); 
		if (err) return console.error(err);
		test.ok(body.length, 'Get request to /posts with query string returns a list of length > 0'); 
		test.ok(body[0].title, 'First object returned by /posts with query string has a property title'); 
		body.forEach(function(e) {
			test.ok(e.title, 'Post created using post request', 'All posts have correct title'); 
		});  
		test.done(); 
	}); 
};

exports.putUpdatesPosts = function(test) {
	// create temp post 
	request({
		url: 'http://localhost:1337/posts', 
		method: 'POST', 
		json: {
			title: 'Temp post', 
			content: 'This is going to be deleted.'
		}
	}, function(err, res, body) {
		if (err) return console.error(err); 
		request({
			url: 'http://localhost:1337/posts', 
			method: 'PUT', 
			json: {
				conditions: {
					title: 'Temp post'
				},
				update: {	
					title: 'Update temp post' 
				}
			}
		}, function(err, res, body) {
			if (err) return console.error(err); 
			test.equal(body.title, 'Update temp post', 'Updated post returns correct title.'); 
			test.done(); 
		}); 
	}); 
}; 

exports.deleteRemovesPosts = function(test) {
	// Create a post to be deleted
	request({
		url: 'http://localhost:1337/posts/',
		method: 'POST', 
		json: {
			title: 'Temp', 
			content: 'Temp post', 
			tags: ['one', 'two', 'three']
		}
	}, function(err, res, body) {
		if (err) return console.error(err); 
		request({
			url: 'http://localhost:1337/posts', 
			method: 'DELETE',
			json: {
				title: 'Temp'
			}
		}, function(err, res, body) {
			if (err) return console.error(err);  
			test.equal(body[0].title, 'Temp', 'Returns deleted post title as Temp'); 
			test.done(); 
		}); 
	}); 
};

// this should run only after all the other tests have run
exports.deleteByIDRemovesPosts = function(test) {
	request({
		url: 'http://localhost:1337/posts',
		qs: {
			title: 'Post created using post request'
		},
		json: {}
	}, function(err, res, body) {
		if (err) return console.error(err);
		var id = body[0]._id; 
		request({
			url: 'http://localhost:1337/posts/' + id, 
			method: 'DELETE', 
			json: {}
		}, function(err, res, body) {
			if (err) return console.error(err); 
			test.ok(Object.keys(body).length, 'DeleteByID returns a post.'); // returns object, need to do a .keys() before you can get length 
			test.ok(body.title, 'DeleteByID returns a post with a title'); 
			test.done(); 
		}); 
	});
}
