var request = require('request'); 

exports.indexReturnsStatus200 = function(test) {
	request('http://localhost:1337', function(error, response, body) {
		test.equal(response.statusCode, 200, 'Index returns status code 200.'); 
		test.done(); 
	}); 
}; 