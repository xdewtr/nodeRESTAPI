// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
var morgan     = require('morgan'); 		// used to see requests
var mongoose   = require('mongoose');
var User       = require('./app/models/user');
var port       = process.env.PORT || 8080; // set the port for our app

// connect to mongo via mongoose
//mongoose.connect('mongodb://admin:pass@apollo.modulusmongo.net:27017/evaX9yxo', function(err){
//	if(err) throw err;
//});

// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log all requests to the console 
app.use(morgan('dev'));

// Routes FOR OUR API
// =============================

// basic route for the home page
app.get('/',function(req,res){
	res.send('homepage');
});

// set up routes under API
var apiRouter = express.Router();

// test route 
apiRouter.get('/',function(req,res){
	res.json({ message: "get success"});
});

// set the router under that api
app.use('/api',apiRouter);

// listen to the port
app.listen(port);


