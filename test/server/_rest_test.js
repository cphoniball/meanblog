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
		test.ok(body.length, 'Get request to /posts with query string returns a list of length > 0'); 
		test.ok(body[0].title, 'First object returned by /posts with query string has a property title'); 
		test.done(); 
	}); 
};