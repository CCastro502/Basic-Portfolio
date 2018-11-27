// Array of topics to be updated with user-input
var topic = ["rick and morty", "simpsons", "family guy", "big mouth", "spongebob", "rocket power", "futurama", "disenchanted"];

// Function to list & re-list (if user inputs string) topics to be clicked
function listTopics(topic) {
    $("#topic-holder").html("")
    for (i = 0; i < topic.length; i++) {
        $("#topic-holder").append($("<button>").addClass("btn btn-outline-primary ind-topic").attr("id", "item-" + i).text(topic[i]));
    }
}

// Lists original topics
listTopics(topic);

// Function to grab user input, push it into the topic array, then call on listTopics function w/ new topic array
$("#search").on("click", function () {
    topic.push($("#termField").val().trim());
    listTopics(topic);
    $("#termField").val("")
})

// function that, once the user clicks a topic, asks the user to pick a type of information for that topic (gifs, omdb, or news), then calls on the appropriate function
$("body").on("click", "button.ind-topic", function (event) {
    var id1 = (event.currentTarget.attributes.id.value).split("-")[1];
    id1 = parseInt(id1);
    pickFormat(id1)
})

// function takes in the id from the topic button pushed, and waits until user picks a format to call the corresponding function which pulls api info
function pickFormat(id1) {
    alert("You must select a format. Please press the gif, movie, or news button");
    $(".btn-block").on("click", function (event) {
        var id2 = event.currentTarget.attributes.id.value
        if (id2 === "gifButton") {
            gifPull(id1);
        } else if (id2 === "movieButton") {
            moviePull(id1);
        } else if (id2 === "newsButton") {
            newsPull(id1);
        } else {
            $(".container").html("error");
        }
    })
}

// Displays gifs for the user-selected topic
function gifPull(id1) {
    var condensedTopic = topic[id1].split(' ').join('');
    var url = "https://api.giphy.com/v1/gifs/search?apikey=Os7VxuMiC67XHgLFaBXLa2l83d03JI9D&q=" + condensedTopic + "&limit=9";
    $.ajax({
        url: url,
        method: "GET",
    }).then(function (result) {
        $("#info-holder").html("");
        var shortHand = result.data;
        console.log(shortHand);
        for (i = 0; i < shortHand.length; i++) {
            $("#info-holder").append($("<img>").addClass("still").attr("src", shortHand[i].images.fixed_height_still.url).attr("id", "pic-" + i))
        }
        $(".still").on("click", function (event) {
            var y = this.id.split('-')[1]
            console.log(this.src);
            if (this.src == shortHand[y].images.fixed_height_still.url) {
                this.src = shortHand[y].images.fixed_height.url
            } else {
                this.src = shortHand[y].images.fixed_height_still.url
            }
        })
    })
}

// Displays movie info for the user-selected topic
function moviePull(id1) {
    // var condensedTopic = topic[id1].split(' ').join('');
    var url = "http://www.omdbapi.com/?i=tt3896198&apikey=6b6720f9&t=" + topic[id1];
    $.ajax({
        url: url,
        method: "GET",
    }).then(function (result) {
        $("#info-holder").html("");
        $("#info-holder").append($("<img>").attr("src", result.Poster))
        $("#info-holder").append($("<h3>").attr("id", "movieTitle").text(result.Title))
        if (result.Director === "N/A") {
            $("#info-holder").append($("<p>").attr("id", "director").text("Director/Writers: " + result.Writer))
        } else {
            $("#info-holder").append($("<p>").attr("id", "director").text("Director/Writers: " + result.Director))
        }
        $("#info-holder").append($("<p>").attr("id", "rated").text("Rated: " + result.Rated))
        $("#info-holder").append($("<p>").attr("id", "rating").text("imdb Rating: " + result.imdbRating))
        $("#info-holder").append($("<p>").attr("id", "plot").text("Plot: " + result.Plot))
    })
}

// Display news info for the selected topic
function newsPull(id1) {
    var condensedTopic = topic[id1].split('').join('').toLowerCase();
    var url = "https://content.guardianapis.com/search?api-key=1e735112-157f-4f28-8980-fb5bdade6370&q=" + condensedTopic;
    $.ajax({
        url: url,
        method: "GET",
    }).then(function (result) {
        $("#info-holder").html("");
        var shortHand = result.response.results
        for (i = 0; i < 5; i++) {
            $("#info-holder").append($("<h3>").attr("id", "title").text(shortHand[i].webTitle))
            $("#info-holder").append($("<p>").attr("id", "webPubDate").text("Web Publication Date: " + shortHand[i].webPublicationDate))
            $("#info-holder").append($("<a>").attr("href", "https://www.theguardian.com/tv-and-radio/2018/may/11/rick-and-morty-renewed-for-70-more-episodes-adult-swim").attr("id", "url").attr("target", "_blank").text("Link"))
            $("#info-holder").append($("<br>"))
            $("#info-holder").append($("<br>"))
        }
    })
}