let tictac;
const player = "X";
const comp = "O";

const winMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

const boxes = document.querySelectorAll('.box');

startGame();

function startGame() {
    document.querySelector('.finish').style.display = "none"
    tictac = Array.from(Array(9).keys());
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = '';
        boxes[i].style.removeProperty('background-color');
        boxes[i].addEventListener('click', funClick, false);
    }
}

function funClick(square) {
    if (typeof tictac[square.target.id] == 'number') {
        turn(square.target.id, player)
        if (!tie()) turn(compTurn(), comp);
    }
}

function turn(squareId, playerz) {
    tictac[squareId] = playerz;
    document.getElementById(squareId).innerText = playerz;
    let won = check(tictac, playerz)
    if (won) gameOver(won)
}

function check(board, playerz) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let won = null;
    for (let [index, win] of winMoves.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            won = { index: index, playerz: playerz };
            break;
        }
    }
    return won
}

function gameOver(won) {
    for (let index of winMoves[won.index]) {
        document.getElementById(index).style.backgroundColor =
            won.playerz == player ? "limegreen" : "red";
    }
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].removeEventListener('click', funClick, false)
    }
    Winner(won.playerz == player ? "YOU WIN!" : "Loser...")
}

function Winner(who) {
    document.querySelector('.finish').style.display = "block";
    document.querySelector('.finish .text').innerText = who;
}

function availableSquare() {
    return tictac.filter(s => typeof s == "number");
}

function compTurn() {
    return availableSquare()[0];
}

function tie() {
    if (availableSquare().length == 0) {
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.backgroundColor = 'purple';
            boxes[i].removeEventListener('click', turnClick, false);
        }
        Winner("Tie Game")
        return true;
    }
    return false;
}
