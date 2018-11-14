var x = 0;
var wins = 0;
var losses = 0;
var stringArray = [];
var numberArray = [];
var totalAdded;
function makeDivs() {
    $('#whiteOnion').attr('value', Math.floor(Math.random() * 12) + 1);
    $('#redOnion').attr('value', Math.floor(Math.random() * 13));
    $('#yellowOnion').attr('value', Math.floor(Math.random() * 13));
    $('#shallot').attr('value', Math.floor(Math.random() * 13));
    $('.totalValContainer').addClass('total');
    randomNum = Math.floor(Math.random() * 101 + 19);
    $('.totalValContainer').attr('totalVal', randomNum);
    $('.totalValContainer').text(randomNum);
    $('.totalAddedContainer').addClass('added');
    $('.win').text(wins);
    $('.loss').text(losses);
}
makeDivs();

$(".onion").on('click', function (e) {
    stringArray.push(e.target.getAttribute("value"));
    var numberArray = stringArray.map(Number);
    var totalAdded = function () {
        x = 0
        for (j = 0; j < numberArray.length; j++) {
            x += numberArray[j];
        }
        return x;
    }
    winChecker(totalAdded);
    $('.totalAddedContainer').text(totalAdded);

});

function winChecker(totalAdded) {
    if (totalAdded() === randomNum) {
        wins++;
        x = 0;
        numberArray.length = 0;
        stringArray.length = 0;
        makeDivs();
        alert("You carried all the onions you could back to the farm! Now get back out there and get some more onions!")
    } else if (totalAdded() > randomNum) {
        losses++;
        x = 0;
        numberArray.length = 0;
        stringArray.length = 0;
        makeDivs();
        alert("You tried to carry too many onions and your bag ripped. Grab a new bag and start again or else we'll starve this winter!")
    }
}