var express = require('express'); // node js middleware
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); // mongodb driver
var program = require('commander'); // command line options and utils
var handlebars = require('express3-handlebars');

var app = express();

// custom application settings
app.set('NAME', 'My Mean Blog');
app.set('PORT', '1337');
app.set('URL', 'localhost:1337');
app.set('DB_CONNECTION_URL', 'mongodb://localhost/meanblog');

// application middleware
app.use(bodyParser());

// view engine/templating
// using hbs
app.engine('hbs', handlebars({ defaultLayout: __dirname + '/client/views/layouts/main.hbs' }));
app.set('view engine', 'hbs');

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

// basic view routing
var views = require('./server/routes/views');
app.get('/', views.index);

// setting up DB connection
mongoose.connect(app.get('DB_CONNECTION_URL'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
 
var post = require('./server/models/posts'); 

// REST api routing
app.get('/posts', post.get);
app.post('/posts', post.create);
app.put('/posts', post.update); 
app.delete('/posts', post.delete); 
app.delete('/posts/:id', post.deleteById);

app.listen(app.get('PORT'), function() {
	console.log('listening on port ' + app.get('PORT')); 
});	
 
