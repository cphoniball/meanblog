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

	var postOne = new Post({
		title: "Here's my first post",
		tags: ['sample', 'another', 'one more'],
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, totam nulla minus consequuntur doloremque cupiditate perspiciatis obcaecati itaque. Consequatur officia accusamus necessitatibus tenetur facere hic temporibus ab tempora minima veniam."
	});

	var postTwo = new Post({
		title: "A second post",
		tags: ['Hello', 'world', 'how are you'],
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, rem, earum ratione blanditiis itaque esse laudantium consequuntur repellat nisi possimus eius velit quos? Iusto, ex dignissimos et quas laboriosam soluta voluptatem quaerat at iste repudiandae atque sed perspiciatis nihil recusandae in deserunt inventore quibusdam. Praesentium, fugit, molestias, dolor modi esse quo itaque excepturi culpa sed voluptatem facilis blanditiis ratione mollitia ex minima unde consequatur autem harum qui placeat odio repellendus laudantium. Alias, ducimus aut provident. Quod, mollitia, facere enim amet minus ipsam dolorem magnam et aspernatur tenetur ut aperiam natus beatae incidunt debitis architecto est animi qui aliquid assumenda esse nulla ipsa voluptatum deleniti iure reiciendis in repudiandae dolorum praesentium tempore ex quaerat aut quae quibusdam corrupti perspiciatis expedita neque. Iure, expedita, dignissimos consequatur laboriosam facilis quidem quas assumenda atque vero ducimus numquam perspiciatis dolorem dolor labore molestias corporis ullam. Cupiditate, pariatur, tenetur harum consequuntur earum qui minus officiis debitis possimus ducimus voluptate excepturi explicabo eius cumque nesciunt libero fugiat delectus doloribus aliquid quod veniam sit nostrum deserunt tempora deleniti autem rem quae hic perspiciatis! Voluptas, odio, quam, debitis assumenda amet excepturi laborum distinctio harum eos quidem illo sapiente. Unde, earum, numquam inventore nulla doloribus labore aliquid ipsum possimus qui."
	});

	var postThree = new Post({
		title: "test",
		tags: ['Hello', 'world', 'how are you'],
		content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, rem, earum ratione blanditiis itaque esse laudantium consequuntur repellat nisi possimus eius velit quos? Iusto, ex dignissimos et quas laboriosam soluta voluptatem quaerat at iste repudiandae atque sed perspiciatis nihil recusandae in deserunt inventore quibusdam. Praesentium, fugit, molestias, dolor modi esse quo itaque excepturi culpa sed voluptatem facilis blanditiis ratione mollitia ex minima unde consequatur autem harum qui placeat odio repellendus laudantium. Alias, ducimus aut provident. Quod, mollitia, facere enim amet minus ipsam dolorem magnam et aspernatur tenetur ut aperiam natus beatae incidunt debitis architecto est animi qui aliquid assumenda esse nulla ipsa voluptatum deleniti iure reiciendis in repudiandae dolorum praesentium tempore ex quaerat aut quae quibusdam corrupti perspiciatis expedita neque. Iure, expedita, dignissimos consequatur laboriosam facilis quidem quas assumenda atque vero ducimus numquam perspiciatis dolorem dolor labore molestias corporis ullam. Cupiditate, pariatur, tenetur harum consequuntur earum qui minus officiis debitis possimus ducimus voluptate excepturi explicabo eius cumque nesciunt libero fugiat delectus doloribus aliquid quod veniam sit nostrum deserunt tempora deleniti autem rem quae hic perspiciatis! Voluptas, odio, quam, debitis assumenda amet excepturi laborum distinctio harum eos quidem illo sapiente. Unde, earum, numquam inventore nulla doloribus labore aliquid ipsum possimus qui."
	});

	postOne.save(savePostCallback);
	postTwo.save(savePostCallback);
	postThree.save(savePostCallback);

	function savePostCallback(err, post) {
		if (err) return console.error(err);
		console.log(post.title + ' saved to database.');
	}

	app.get('/', function(req, res) {
		res.render('index');
	});

	app.get('/db/posts', function(req, res) {
		Post.find(function(err, docs) {
			if (err) return console.error(err);
			res.send(docs);
		});
	});

	// database crud methods
	app.get('/db/post/:id', function(req, res) {
		Post.find({ title: /^test/ }, function(err, docs) {
			if (err) return console.error(err);
			res.send(docs);
		});
	});

	app.listen(app.get('PORT'));

	console.log('Listening on port ' + app.get('PORT'));
});

