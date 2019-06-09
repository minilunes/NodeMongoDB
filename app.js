var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

let option = { useNewUrlParser: true };  // new
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb+srv://BCStudent:@@MOrtiz488522@cluster0-qn7du.azure.mongodb.net/test?retryWrites=true";


// pull in our to files with 2 families of route (get, put, etc)
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  // new
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// tells Express that requests to http://localhost:3000/ should use the index router
// and requests to http://localhost:3000/users shold use the users router file.
// app.use('/', routes);
// app.use('/users', users);

// new code from example
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
});
server.listen(port,() => {
console.log(`Server running at port `+port);
});

MongoClient.connect(mongoUrl, option, (err, database) => {
    if (err) return console.log(err)
    let db = database.db("Prog219mongoDB")
    require('./routes/index')(app, db);

    app.listen(port, () => {
        console.log('Web server is live on ' + port);
    });

})


