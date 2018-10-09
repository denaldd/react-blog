var express = require('express');
var http = require ("http");
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require("cors");
var cookieParser = require ("cookie-parser");
var session = require ("express-session");
var passport = require ("passport");
var upload = multer();
var app = express();

// Setting CORS options
var corsOptions = {
	"origin": ["http://localhost"],
	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
	"preflightContinue": false,
	"credentials": true
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(session({
	secret: "HYqrvagQ#&!F!%V]Ww/4KiVs$s",
	resave: true,
	saveUninitialized: true
}));
// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/login', function(req, res){
   console.log(req.body);
   res.send(req.body);
});
var httpServer = http.createServer(app);
httpServer.listen(3003);