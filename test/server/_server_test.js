var request = require('request'); 

exports.indexReturnsStatus200 = function(test) {
	testPathReturns200(test, '/');  
}; 

exports.staticCSSreturnsStatus200 = function(test) {
	testPathReturns200(test, '/css/main.css'); 
}

exports.staticCSSreturnsStatus200 = function(test) {
	testPathReturns200(test, '/js/main.js'); 
}


function testPathReturns200(test, path) {
	request('http://localhost:1337' + path, function(err, res, body) {
		test.equal(res.statusCode, 200, path + ' returns status code 200.');
		test.done(); 
	});
}