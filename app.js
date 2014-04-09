var express = require('express'); // node js middleware
var mongoose = require('mongoose'); // mongodb driver
var program = require('commander'); // command line options and utils 

var handlebars = require('express3-handlebars'); 

var app = express(); 

// custom application settings 
app.set('name', 'My Mean Blog'); 
app.set('port', '1337'); 
app.set('url', 'localhost:1337'); 

// view engine/templating
// using hbs
app.engine('hbs', handlebars({ defaultLayout: __dirname + '/client/views/layouts/main.hbs' })); 
app.set('view engine', 'hbs'); 

// application settings
app.set('views', __dirname + '/client/views'); 

// make application settings available to templates 
app.locals({
	meanName: app.get('name'),
	url: app.get('url')
}); 

// static assets
app.use('/css', express.static(__dirname + '/client/assets/css'));
app.use('/js', express.static(__dirname + '/client/assets/js'));
app.use('/img', express.static(__dirname + '/client/assets/img'));
app.use('/packages', express.static(__dirname + '/packages'));

app.get('/', function(req, res) {
	res.render('index'); 
}); 

app.listen(app.get('port')); 

console.log('Listening on port ' + app.get('port')); 