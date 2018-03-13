//hangman Game
// we need a variable array for the word bank to choose from(randomly)
var furnitureStyles = [
    "jacobean",
    "chippendale",
    "hepplewhite",
    "federal",
    "sheraton",
    "victorian",
    "contemporary"
]


var chosenWord = furnitureStyles[Math.floor(Math.random() * furnitureStyles.length)];
var lettersInChosenWord = chosenWord.split("");
var numBlanks = lettersInChosenWord.length;
var blanksAndSuccesses = [];
var numGuesses = 15;
var numWins = 0;
var numLosses = 0;
var wrongGuesses = [];
var keyPress;
var letterCheck = false;
document.getElementById("winCounter").innerHTML = numWins;
document.getElementById("lossCounter").innerHTML = numLosses;

function gameReset() {
    chosenWord = furnitureStyles[Math.floor(Math.random() * furnitureStyles.length)];
    lettersInChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;
    blanksAndSuccesses = [];
    numGuesses = 15;
    wrongGuesses = [];
    letterCheck = false;

    console.log(lettersInChosenWord)
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }
    document.getElementById("myWord").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("guessesLeft").innerHTML = numGuesses;
    document.getElementById("wrongGuesses").innerHTML = wrongGuesses;

}
gameReset();
function didIWin(){
    if (lettersInChosenWord.join(" ") === blanksAndSuccesses.join(" ")){
        numWins++;
        alert("you guessed " + chosenWord + "!");
        alert("you win!");
        document.getElementById("winCounter").innerHTML = numWins;
        gameReset();
    }else if (numGuesses === 0){
        numLosses++;
        document.getElementById("lossCounter").innerHTML = numLosses;
        document.getElementById("wrongGuesses").empty;
        alert("you have no more guesses left...");
        alert("YOU LOSE");
        alert("GOOD DAY SIR!");
        gameReset();
    }
}

//I check to see if the key pressed is in the chosen word, 
//and replace all blanks with chosen letter
function letterChecker(keyPress) {
    letterCheck = false;
    numGuesses--;
    for (var i = 0; i < numBlanks; i++) {

        if (lettersInChosenWord[i] === keyPress) {
            letterCheck = true;
            blanksAndSuccesses[i] = keyPress;

        }
    }
    //unless the letter isnt in the word,
    //which I'll push the incorrect letter to the "wrong guesses" array
    if (!letterCheck) {
        wrongGuesses.push(keyPress);

    }
    console.log(numGuesses);
    console.log(blanksAndSuccesses);
    console.log(lettersInChosenWord);
    console.log(wrongGuesses);
    document.getElementById("myWord").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" ");
    document.getElementById("guessesLeft").innerHTML = numGuesses;
}
//onkeyup that listens for a letter pressed
document.onkeyup = function (event) {
    keyPress = event.key;
    console.log(keyPress);
    letterChecker(keyPress);
    didIWin();
}