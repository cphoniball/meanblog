var express = require('express'); // node js middleware
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var mongoose = require('mongoose'); // mongodb driver
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var handlebars = require('express3-handlebars'); - I don't think I need this with express now

var app = express();

// custom application settings
app.set('NAME', 'My Mean Blog');
app.set('PORT', '1337');
app.set('URL', 'localhost:1337');
app.set('DB_CONNECTION_URL', 'mongodb://localhost/meanblog');

// application middleware
app.use(bodyParser());
app.use(cors()); // enable all cross-domain requests
app.use(cookieParser('optional secret string here'));
app.use(session({ secret: 'keyboard cat' , key: 'sid' })); // in production should use cookie: { secure: true }, but this require a https-enabled website
app.use(passport.initialize());
app.use(passport.session());

// view engine/templating
app.set('view engine', 'html');

// application settings
app.set('views', __dirname + '/client/views');

// make application settings available to templates
app.locals.meanName = app.get('NAME');
app.locals.url = app.get('URL');

// static assets
app.use('/css', express.static(__dirname + '/client/assets/css'));
app.use('/js', express.static(__dirname + '/client/assets/js'));
app.use('/img', express.static(__dirname + '/client/assets/img'));
app.use('/packages', express.static(__dirname + '/packages'));
app.use('/controllers', express.static(__dirname + '/client/controllers'));

// setting up DB connection
mongoose.connect(app.get('DB_CONNECTION_URL'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// passport configuration
// passport.use(new LocalStrategy(
// 	function(username, password, done) {
// 		User.findOne({ username: username }, function(err, user) {
// 			if (err) {
// 				return done(err);
// 			} else if (!user) {
// 				return done(null, false, { message: "We don't have records of anyone with that username." });
// 			} else if (!user.validPassword(password)) { // need to write this method apparently
// 				return done(null, false, { message: "Incorrect password." });
// 			} else {
// 				return done(null, user); // this is equivalent to validating the request, or returning "true" for password/username match
// 			}
// 		});
// 	}
// ));

// basic view routing
app.get('/', function(req, res) {
	res.sendfile(__dirname + '/client/views/index.html');
});

// app.get('/login', function(req, res) {
// 	res.sendfile(__dirname + '/client/views/index.html');
// });

// app.post('/login', passport.authenticate('some method here'), function(req, res) {

// });

// blog post API routing
var postApi = require('./server/api/post_api.js');

app.get('/posts', postApi.get);
app.post('/posts', postApi.create);
app.put('/posts', postApi.update);
app.delete('/posts', postApi.delete);
app.delete('/posts/:id', postApi.deleteById);

// user API routing	
var userApi = require('./server/api/user_api.js');

app.get('/users', userApi.get);
app.post('/users', userApi.create);
app.put('/users', userApi.update);
app.delete('/users', userApi.delete);

app.listen(app.get('PORT'), function() {
	console.log('listening on port ' + app.get('PORT'));
});