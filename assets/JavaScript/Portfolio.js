var images = [
    ["assets/images/api.png", "Portfolio/API.html"],
    ["assets/images/Trivia-Game.png", "Portfolio/Trivia-Game.html"],
    ["assets/images/Onion-Collector.png", "Portfolio/Onion-Collector.html"],
    ["assets/images/Word-Guessing-Game.png", "Portfolio/Word-Guessing-Game.html"]
]
    

var showImage;
var count = 0;
function displayImage() {
    var img = $("<img>");
    img.attr("src", images[count][0]);
    img.attr("width", "650px");
    img.attr("target", "_blank");
    $("#image-holder").html(img);
    $("#link-holder").html("<a href='" + images[count][1] + "'>Link To</a>");
    startSlideshow();
}

function nextImage() {
    $("image-holder").html(" ")
    count++;
    if (count === images.length) {
        count = 0;
    }
    displayImage();
}

function startSlideshow() {
    showImage = setTimeout(nextImage, 5000);
}

displayImage();