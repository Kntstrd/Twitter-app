var AiTweets = ["Thats cool", "Oh! yeah!", "Nice try", "Very well said", "Awesome!", "Amazing"];
var computer = "ai"

$.ajax({
    type: "GET",
    url: "/ajax",
    success: function(data) {
        for ( var i = 0; i < data.tweets.length; i++){
            appendNewTweet(data.tweets[i]);
            $('#new-tweet').val('');
        }
    }
});

function appendNewTweet(tweet) {
    var newTweet = "<div class='twitter-item "+ tweet.from + "'>"  +
    "<div class = 'tweet-text " + tweet.from + "'>" + tweet.text  + "</div>" + 
    "<br>" + "<div class ='tweet-time " + tweet.from + "'>" + 
    new Date(tweet.time).toLocaleDateString() + 
    " " + new Date(tweet.time).toLocaleTimeString()  + "</div>" + "</div>"; 

    $('#tweets-target').prepend(newTweet);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$('#tweet-button').click(function() {
    newTweeet();
});

$('input[type=text]').on('keydown', function(e) {
    if (e.which == 13) {
        e.preventDefault();
        newTweeet();
        setTimeout(ComputerTweeet, 2000);
        
    }
});

function newTweeet(){
    $.ajax({
        type: "POST",
        url: "/ajax",
        contentType: 'application/json',
        data: JSON.stringify({tweet: $('#new-tweet').val()}),
        success: function(data) {
                appendNewTweet(data);
                $('#new-tweet').val('');
        }
    })
}

function ComputerTweeet(){
    $.ajax({
        type: "POST",
        url: "/ajax",
        contentType: 'application/json',
        data: JSON.stringify({tweet: AiTweets[getRandomInt(0,5)],
                              from: "ai"}),
        success: function(data) {
                appendNewTweet(data);
                $('#new-tweet').val('');
        }
    })
}



