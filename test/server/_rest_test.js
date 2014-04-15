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
		json: {} // this is required to accept the response as JSON
	}, function(err, res, body) {
		if (err) return console.error(err);
		if (typeof body === 'array') {
			test.ok(body.length, 'Get request to /posts with query string returns a list of length > 0'); 
		} else {
			test.ok(Object.keys(body).length, 'Get request to /posts with query string returns a list of length > 0'); 
		}
		test.ok(body[0].title, 'First object returned by /posts with query string has a property title'); 
		test.equal(body[0].title, 'Post created using post request', 'Get w/ query by title returns correct post'); 
		test.done(); 
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
		// delete the post we just created
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
