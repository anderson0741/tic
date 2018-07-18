const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/*
* Define what the players characters will be in the tictac board, that will be sent to the client
*/
const player = "X";
const comp = "O";

var tictac = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var winner = null;
var winningMove = null;

/* 
* winMoves is what patterns can be hit in order to end the game, and have a winner set
*/
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

/*
* startGame function clears prior data, and sets it back to the begginning before anything has been set.  It is linked to the reset button
*/
function startGame() {
    tictac = Array.from(Array(9).keys());
    winner = null;
    winningMove = null;
}


function funClick(square) {
    if (typeof tictac[square] == 'number') {
        tictac[square] = player;
        return check(player)
    }
}

/*
* check determines whether a given player has won based on the gameboard(tictac)
* 
* @param playerz - Which player to check (comp, player) 
*/
function check(playerz) {
    let plays = tictac.reduce((a, e, i) =>
        (e === playerz) ? a.concat(i) : a, []);
    let winner = null;
    for (let [index, win] of winMoves.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            winner = true;
            winningMove = win;
            break;
        }
    }
    return winner
}

function availableSquare() {
    return tictac.filter(d => typeof d == "number");
}

/*
* this will determine where the computer will go
* it will call into the available squares function and set it equal to as
* it will take the board, then check the as, choose a random number out of whats left from the as, and change it on the tictac board to an "O", which is what comp is equal to.
* then check if it won
*/
function compTurn() {
    var as = availableSquare();
    tictac[as[Math.floor(Math.random() * as.length)]] = comp;
    return check(comp);
}

/*
* this will check the array of available boxes left, if there are no boxes left for a player to choose it will return true.  Later it will be checked if there is a winner first, if not it will be a tie
*/
function tie() {
    if (availableSquare().length == 0) {
        return true;
    }
    return false;
}


app.use(bodyParser.json());
app.get('/', function (req, res) {
    return res.sendFile('/Users/lawrenceanderson/Desktop/dev/game/tic/client/index.html');
});

app.get("/reset", function (req, res) {
    startGame()
    res.send(startGame());
});

app.get('/:path', function (req, res) {
    return res.sendFile('/Users/lawrenceanderson/Desktop/dev/game/tic/client/' + req.params.path);
});

app.post('/turn', (req, res) => {
    const playerMove = req.body.playerMove
    const playerWon = funClick(playerMove)

    if (playerWon) {
        return res.send({
            winner: player,
            tictac: tictac,
            winningMove: winningMove
        })
    };
    const tieGame = tie();
    if (tieGame) {
        return res.send({
            winner: 'tie',
            tictac: tictac,
            winningMove: winningMove
        })
    }
    const compWon = compTurn();
    if (compWon) {
        return res.send({
            winner: comp,
            tictac: tictac,
            winningMove: winningMove
        })
    };
    return res.send({
        winner: null,
        tictac: tictac
    })
});


app.listen(8080, () => {
    console.log("Server is running on port 8080");
}) 
