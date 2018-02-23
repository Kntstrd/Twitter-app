var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var tweets = [
    // {text: "Your the man!", time: new Date().getTime() - 12300, from: "ai"},
    // {text: "Yeah!", time: new Date().getTime() - 10000, from: "ai"},
    {text: "Hey!", time: new Date().getTime(), from: "ai"}
    
]

app.use(express.static(__dirname + '/public'));


app.get('/ajax', function(request, response){
    response.type('json');
    response.end(JSON.stringify({tweets:tweets}));
});

app.post('/ajax', function(request, response) {
    if (request.body.tweet !== ""){
        var newTweet = {text: request.body.tweet, time: new Date().getTime(), from: request.body.from};
        tweets.push(newTweet);
    }
    response.type('json');
    response.end(JSON.stringify(newTweet)); 
});

var server = app.listen(8080 , function () {
    	console.log('listening to port 8080');
    });


// const express = require('express');

// const app = express();

// app.use(express.static('public'));

// app.set('views', __dirname + '/views');
// app.set('view engine', 'pug');

// app.get('/', function (req, res) {
// 	res.render("index");
// });

// app.listen(8000, function () {
// 	console.log('listening to this joint port 8000');
// });