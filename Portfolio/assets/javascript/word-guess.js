var userGuesses = [];
var guessesLeft = 10;
var wins = 0;
var losses = 0;
var ties = 0;
var unknownWord = "";
var typeCounter = 0;

function wordGenerator() {
    var computerChoices = ["lowly", "start", "chilly", "bun", "bead", "friend", "return", "view", "cloth", "frogs", "celery", "basin", "stand", "special", "broad", "abaft", "plead", "quartz", "mark", "tempt", "shop", "stone", "scorch", "taboo", "hoax", "spiffy", "insure"];
    var cpuWord = computerChoices[Math.floor(Math.random() * computerChoices.length)];
    console.log(cpuWord);
    return cpuWord;
};
var computerWord = wordGenerator();

function scrambledWord(string) {

    var knownWord = "_".repeat(string.length);
    var arr = [...knownWord];
    console.log(knownWord);
    return arr;

}
var unknownWord = scrambledWord(computerWord);

var directionsText = document.getElementById("directions-text");
var userChoiceText = document.getElementById("userchoice-text");
var userGuessList = document.getElementById("userguesslist-text");
var unscrambledWordText = document.getElementById("unscrambledword-text");
var guessesLeftText = document.getElementById("guessesLeft-text")
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");

document.onkeyup = function (event) {

    var userGuess = event.key;
    var userKeyCode = event.keyCode;
    console.log("KeyCode = " + userKeyCode);

    if (userKeyCode > 57 && userKeyCode < 91) {
        userGuesses.push(userGuess);
        directionsText.textContent = "";

        wordChecker(userGuess);
        userChoiceText.textContent = "You chose: " + userGuess;
        userGuessList.textContent = "You have guessed: " + userGuesses;
        unscrambledWordText.textContent = "The word is: " + unknownWord;
        guessesLeft.textContent = "# of guesses left: " + guessesLeft
        winsText.textContent = "Wins: " + wins;
        lossesText.textContent = "Losses: " + losses;
        typeCounter++;
        console.log(typeCounter);
        guessesLeft--;
        console.log(guessesLeft);
    } else {
        alert("You did not enter an alphabetical character.")
    }
};

function wordChecker(userGuess) {
    if (computerWord.includes(userGuess)) {
        alert("You guessed a correct character");
    } else {
        alert("You guessed an incorrect character")
    }
    unscrambledWord(unknownWord, computerWord, userGuess);
}

function unscrambledWord(unknownWord, word, userGuess) {
    for (i = 0; i < word.length; i++) {
        if (userGuess === word[i]) {
            // unscrambledWordText.textContent = "The word is: " + unknownWord;
            // winsText.textContent = "Wins: " + wins;
            // lossesText.textContent = "Losses: " + losses;
            unknownWord.splice(i, 1, word[i]);

        }
    } checkGame(unknownWord, word);
}

unscrambledWordText.textContent = "The word is: " + unknownWord;

function checkGame(unknownWord, word) {

    if (guessesLeft === 0) {
        alert("You lost!!! New game started");
        computerWord = wordGenerator();
        unknownWord.length = 0;
        unknownWord = scrambledWord(computerWord);
        userGuesses = [];
        losses++;
        guessesLeft = 10;
    }
    for (q = 0; q < word.length; q++) {
        var userWin = true;
        if (word[q] !== unknownWord[q]) {
            var userWin = false;
        }
    } if (userWin === true) {
        computerWord = wordGenerator();
        unknownWord.length = 0;
        unknownWord = scrambledWord(computerWord);
        userGuesses = [];
        wins++;
        alert("You've won!!! New game started");
        guessesLeft = 10;
        return true;
    }
}