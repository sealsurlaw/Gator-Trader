// app.js
// csc648-01 fall2018 SFSU
// team 02

// import relavent modules
var express 	= require('express');
var app 		= express();
var formidable 	= require('formidable');
var credentials = require('./credentials.js');
var bodyParser 	= require('body-parser');
var cookies		= require('cookie-parser');
var handlebars 	= require('express-handlebars');

// setput body-parse and cookie-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookies(credentials.cookieSecret));

// prevents leaking server info
app.disable('x-powered-by');

// sets view engine and default view and locations
app.engine('handlebars',handlebars(
	{
		extname:'handlebars',
		defaultLayout:'main',
		layoutDir: __dirname + '/views/layouts/',
		partialsDir:__dirname + '/views/partials/'
	}));
app.set('view engine','handlebars');
app.set('views',__dirname+'/views');

// set port by variable or defaults to 8000
app.set('port',process.env.PORT||8000)

// static resources located in public folder
app.use(express.static(__dirname + '/public'));

// redirect to home file in routes folder
// ** add more as we make pages **
app.use('/',		require('./routes/home'));
app.use('/about',	require('./routes/about'));

/* Things to add later  */
/* + login session		*/
/* + chat sockets		*/

// start server
app.listen(app.get('port'), function(){
	console.log('Up and Running on port '+app.get('port')+'! press Ctrl-C to terminate.');
});