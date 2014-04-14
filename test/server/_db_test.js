var mongoose = require('mongoose'); 

exports.testDbConnection = function(test) {
	mongoose.connect('mongodb://localhost/meanblog'); 
	var db = mongoose.connection; 
	db.on('error', console.error.bind(console, 'connection error:') ); 
	db.once('open', function() {
		test.ok(true, 'Mongoose established connection to local database');
		test.done(); 
	});  
};