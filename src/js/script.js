// const music = new Audio("./assets/sound/music.mp3");
const turn = new Audio("./assets/sound/Ting.mp3");
const victory = new Audio("./assets/sound/Victory.mp3");
const gamingBoxContainer = document.getElementById("gaming-box-container");
const markingBox = document.getElementsByClassName("marking-box");
const informationBox = document.getElementById("information-box");
const soundButton = document.getElementById("sound-button");
const playerOneScoreBox = document.getElementById("playerOneScoreBox");
const playerTwoScoreBox = document.getElementById("playerTwoScoreBox");
let isTie = false;
let isSound = true;
let arr = ["", "", "", "", "", "", "", "", ""];
let currTurn = "player1";
let isGameActive = true;
document.getElementById("copyright").innerHTML = `Copyright &copy; ${new Date().getFullYear()}`;
let playerOneScore = 0;
let playerTwoScore = 0;
informationBox.innerText = "Player 1's Turn";
playerOneScoreBox.innerHTML = playerOneScore;
playerTwoScoreBox.innerHTML = playerTwoScore;

const player1 = {
    move: '<img src="./assets/images/tick.svg" alt="" />',
};
const player2 = {
    move: '<img src="./assets/images/cross.svg" alt="" />',
};
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
    currTurn = "player1";
    informationBox.innerText = "Player 1's Turn";
    if (!isGameActive) {
        reset.innerText = "Reset";
        isGameActive = true;
    }
});

//Game Logic
gamingBoxContainer.addEventListener("click", (e) => {
    if (e.currentTarget !== e.target && isGameActive) {
        let boxNumber = parseInt(e.target.dataset.index);
        if (arr[boxNumber]) {
            informationBox.innerText = "Choose Blank Box";
        } else {
            arr[boxNumber] = currTurn === "player1" ? "tick" : "cross";
            markingBox[boxNumber].innerHTML = currTurn === "player1" ? player1.move : player2.move;
            if (checkWin()) {
                //If winning condition is achieved , declare win, else go for next turn.
                declareWin();
            } else {
                if (!arr.includes("")) {
                    isTie = true;
                }
                if (!isTie) {
                    //Changing the playing player
                    currTurn = currTurn === "player1" ? "player2" : "player1";
                    //As the turn has already changed, so if currTurn is player1, we say it's player 1's turn.
                    informationBox.innerText = currTurn === "player1" ? "Player 1's Turn" : "Player 2's Turn";
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
    012
    345
    678
    036
    147
    258
    048
    246
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
    if (currTurn === "player1") {
        informationBox.innerText = "🎊 Player 1 Won 🎊";
        playerOneScore += 1;
        playerOneScoreBox.innerHTML = playerOneScore;
    } else {
        informationBox.innerText = "🎊 Player 2 Won 🎊";
        playerTwoScore += 1;
        playerTwoScoreBox.innerHTML = playerTwoScore;
    }
    isGameActive = false;
    reset.innerText = "Play Again";
}

function declareTie() {
    informationBox.innerText = "It Was A Tie 🤯";
    isGameActive = false;
    reset.innerText = "Play Again";
}
