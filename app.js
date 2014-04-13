var express = require('express'); // node js middleware
var mongoose = require('mongoose'); // mongodb driver
var program = require('commander'); // command line options and utils
var handlebars = require('express3-handlebars');

var app = express();

// custom application settings
app.set('NAME', 'My Mean Blog');
app.set('PORT', '1337');
app.set('URL', 'localhost:1337');
app.set('DB_CONNECTION_URL', 'mongodb://localhost/meanblog');

// view engine/templating
// using hbs
app.engine('hbs', handlebars({ defaultLayout: __dirname + '/client/views/layouts/main.hbs' }));
app.set('view engine', 'hbs');

// application settings
app.set('views', __dirname + '/client/views');

// make application settings available to templates
app.locals({
	meanName: app.get('NAME'),
	url: app.get('URL')
});

// static assets
app.use('/css', express.static(__dirname + '/client/assets/css'));
app.use('/js', express.static(__dirname + '/client/assets/js'));
app.use('/img', express.static(__dirname + '/client/assets/img'));
app.use('/packages', express.static(__dirname + '/packages'));

// setting up DB connection
mongoose.connect(app.get('DB_CONNECTION_URL'));
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// create post schema
	// TODO - separate this logic out into a separate module.. not sure how right now
	var postSchema = mongoose.Schema({
		title: String,
		tags: [String],
		created: { type: Date, default: Date.now },
		lastUpdated: { type: Date, default: Date.now },
		url: String, // need to figure out how to set URL here
		content: String
	});

	var Post = mongoose.model('Post', postSchema);

	app.get('/', function(req, res) {
		res.render('index');
	});

	// Returns a list of post objects
	app.get('/db/posts', function(req, res) {
		Post.find(function(err, docs) {
			if (err) return console.error(err);
			res.send(docs);
		});
	});

	// Create a single post object
	app.post('/db/posts', function(req, res) {
		var post = new Post({
			title: req.body.title,

		});
	});


	app.listen(app.get('PORT'));

	console.log('Listening on port ' + app.get('PORT'));
});

