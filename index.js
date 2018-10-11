var express = require('express');
var http = require ("http");
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require("cors");
var cookieParser = require ("cookie-parser");
var session = require ("express-session");
var passport = require ("passport");
var mysql = require ("mysql");
var request = require ("request");
var LocalStrategy = require ("passport-local").Strategy;
var crypto = require('crypto');
var localStorage = require('localStorage');
var upload = multer();
var app = express();
var config = require ("./config");
// Setting CORS options
var corsOptions = {
	"origin": ["http://localhost"],
	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
	"preflightContinue": false,
	"credentials": true,
	'allowedHeaders': ['sessionId', 'Content-Type']
};

var con = mysql.createConnection({
	host: config.dbUrl,
	user: config.dbUser,
	password: config.dbPassword,
	database: config.dbName
  });

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(session({
	secret: "",
	resave: true,
	saveUninitialized: true
}));
// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/register', function(req, res){
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   var a = req.body.form;
   var b = JSON.parse(a);
   var country = b.country;
   var email = b.email;
   var name = b.name;
   var password = b.password;
   con.connect(function(err) {
	var sql = "INSERT INTO cardi_users (email, name, password, country) VALUES (?, ?, ?, ?)";
		con.query(sql,  [email, name, password, country], function (err, result) {
	  	if (!err){
			res.json(b);
			console.log("1 record inserted");
		}
		});
	});
});

 app.post("/login", function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Request-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With');
	var a = req.body.form;
	var b = JSON.parse(a);
	var email = b.LoginEmail;
	var password = b.LoginPassword; 
	var query = "SELECT * FROM cardi_users WHERE cardi_users.email=? AND cardi_users.password=? ";
	    con.query(query, [email, password], function(err, result, fields) {
		if (!err) {
			if(result.length){
				res.json(result[0]);
			} else {
				res.send('err');
			}
		} else {
			res.status(400).send(err);
		}
	});
});

var httpServer = http.createServer(app);
httpServer.listen(3003);
