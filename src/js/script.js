// const turn = new Audio("./assets/sound/Ting.mp3");
const victory = new Audio("./assets/sound/Victory.mp3");
const gamingBoxContainer = document.getElementById("gaming-box-container");
const markingBox = document.getElementsByClassName("marking-box");
const informationBox = document.getElementById("information-box");
const soundButton = document.getElementById("sound-button");
const playerOneScoreBox = document.getElementById("playerOneScoreBox");
const playerTwoScoreBox = document.getElementById("playerTwoScoreBox");
const tickMove = `<img src="./assets/images/tick.svg" />`;
const crossMove = `<img src="./assets/images/cross.svg" />`;
const tickHelpingImage = `<img src="./assets/images/tick.svg" class="h-7 w-7 ml-3 mt-1"/>`;
const crossHelpingImage = `<img src="./assets/images/cross.svg" class="h-7 w-7 ml-3 mt-1" />`;
let isTie = false;
let isSound = true;
let arr = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
let gameCount = 0;

class Player {
    constructor(name, move, helpImage, emoji, score) {
        this.name = name;
        this.move = move;
        this.helpImage = helpImage;
        this.emoji = emoji;
        this.score = score;
    }
}

const player1 = new Player("Player 1", tickMove, tickHelpingImage, `tick`, 0);
const player2 = new Player("Player 2", crossMove, crossHelpingImage, `cross`, 0);
let currPlayer = player1;

playerOneScoreBox.innerHTML = player1.score;
playerTwoScoreBox.innerHTML = player2.score;
informationBox.innerHTML = `${player1.name}'s Turn ${player1.helpImage}`;
document.getElementById("copyright").innerHTML = `Copyright &copy; ${new Date().getFullYear()}`;

//Sound Handler
soundButton.addEventListener("click", () => {
    if (isSound) {
        isSound = false;
        document.getElementById("soundOff").classList.remove("hidden");
        document.getElementById("soundOn").classList.add("hidden");
        soundButton.childNodes[5].innerText = "Sound Off";
    } else {
        isSound = true;
        document.getElementById("soundOff").classList.add("hidden");
        document.getElementById("soundOn").classList.remove("hidden");
        soundButton.childNodes[5].innerText = "Sound On";
    }
});
//Reset Button Logic

const reset = document.getElementById("reset");
reset.addEventListener("click", (e) => {
    isTie = false;
    e.preventDefault();
    for (let index = 0; index < markingBox.length; index++) {
        const element = markingBox[index];
        element.innerHTML = "";
    }
    arr = ["", "", "", "", "", "", "", "", ""];

    //If game is active, that is player pressed reset and not play again, then do not change the starting player
    if (isGameActive) {
        if (gameCount & 1) {
            currPlayer = player2;
        } else {
            currPlayer = player1;
        }
    } else {
        gameCount = gameCount + 1;
        // is player pressed Play Again button, change the starting player
        if (gameCount & 1) {
            currPlayer = player2;
            player1.emoji = `cross`;
            player1.move = crossMove;
            player1.helpImage = crossHelpingImage;
            player2.emoji = `tick`;
            player2.move = tickMove;
            player2.helpImage = tickHelpingImage;
        } else {
            currPlayer = player1;
            player1.emoji = `tick`;
            player1.move = tickMove;
            player1.helpImage = tickHelpingImage;
            player2.emoji = `cross`;
            player2.move = crossMove;
            player2.helpImage = crossHelpingImage;
        }
        reset.innerText = "Reset";
        isGameActive = true;
    }
    informationBox.innerHTML = `${currPlayer.name}'s Turn ${currPlayer.helpImage}`;
});

//Game Logic
gamingBoxContainer.addEventListener("click", (e) => {
    if (e.currentTarget !== e.target && isGameActive) {
        let boxNumber = parseInt(e.target.dataset.index);
        if (arr[boxNumber]) {
            //If clicked on already checked box, tell so select blank box and do nothing
            informationBox.innerHTML = "Choose Blank Box";
        } else {
            //Puts tick or cross to the clicked box
            if (currPlayer === player1) {
                arr[boxNumber] = player1.emoji;
                markingBox[boxNumber].innerHTML = player1.move;
            } else {
                arr[boxNumber] = player2.emoji;
                markingBox[boxNumber].innerHTML = player2.move;
            }
            if (checkWin()) {
                //If winning condition is achieved , declare win, else go for next turn.
                declareWin();
            } else {
                if (!arr.includes("")) {
                    isTie = true;
                }
                if (!isTie) {
                    //Changing the playing player
                    currPlayer = currPlayer === player1 ? player2 : player1;
                    //As the turn has already changed, so if currPlayer is player1, we say it's player 1's turn.
                    informationBox.innerHTML = currPlayer === player1 ? `${player1.name}'s Turn ${player1.helpImage}` : `${player2.name}'s Turn ${player2.helpImage}`;
                } else {
                    declareTie();
                }
            }
        }
    }
});

//Winning Logic
function checkWin() {
    /*
    Winning Scenarios
    [012, 345, 678, 036, 147, 258, 048 , 246];
    */
    if (arr[0] === arr[1] && arr[0] === arr[2] && arr[0] !== "") {
        return true;
    } else if (arr[3] === arr[4] && arr[3] === arr[5] && arr[3] !== "") {
        return true;
    } else if (arr[6] === arr[7] && arr[6] === arr[8] && arr[6] !== "") {
        return true;
    } else if (arr[0] === arr[3] && arr[0] === arr[6] && arr[0] !== "") {
        return true;
    } else if (arr[1] === arr[4] && arr[1] === arr[7] && arr[1] !== "") {
        return true;
    } else if (arr[2] === arr[5] && arr[2] === arr[8] && arr[2] !== "") {
        return true;
    } else if (arr[0] === arr[4] && arr[0] === arr[8] && arr[0] !== "") {
        return true;
    } else if (arr[2] === arr[4] && arr[2] === arr[6] && arr[2] !== "") {
        return true;
    } else {
        return false;
    }
}

function declareWin() {
    if (isSound) {
        victory.play();
    }
    if (currPlayer === player1) {
        informationBox.innerHTML = `🎊 ${player1.name} Won 🎊`;
        player1.score++;
        playerOneScoreBox.innerHTML = player1.score;
    } else {
        informationBox.innerHTML = `🎊 ${player2.name} Won 🎊`;
        player2.score++;
        playerTwoScoreBox.innerHTML = player2.score;
    }
    isGameActive = false;
    reset.innerText = "Play Again";
}
function declareTie() {
    informationBox.innerHTML = "It Was A Tie 🤯";
    isGameActive = false;
    reset.innerText = "Play Again";
}
