
const express = require('express');
// const cors = require('cors')
// const mongoose = require('mongoose');
const app = express();
// const http = require('http');
// const axios = require('axios');
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
const bodyParser = require('body-parser');

const player = "X";
const comp = "O";

var whoseTurn = "player";  // Will change between "player" and "computer"
var tictac = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// var tictac = ['', '', '', '', '', '', '', '', ''];
var winner = null;
// var winningMove = null;
// let gameBoard = tictac;

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
startGame();

function startGame() {
    tictac = Array.from(Array(9).keys());
    winner = null;
    winningMove = null;
}


function funClick(square) {
    if (typeof tictac[square] == 'number') {
        if (!turn(square, player)) {
            if (!tie()) turn(compTurn(), comp);
            
        }
    }
    // if (typeof tictac[square] == 'number' && !turn(square, player) && !tie() && turn(compTurn(), comp)){

    // }
}

function turn(turnInfo, callBack) {
    // gameBoard[turnInfo.squarechosen] = "X";
    tictac[turnInfo] = player;
    check(function () {
        if (winner !== null) return callBack();
        compTurn(callBack);
    })
}

function check(/*callBack*/board, playerz) {
    // To do,implement check
    // check the current tictac board for a winning combo
        // if there is a winning combo:
            // change a global var to say who won (`winner`)
            // Execute the callback (`callback()`) which will pass along
            // who the winner was (global variable)
    // if (player) {  // Is always truthy right now
    //     winner = "player";
    //     winningMove = winMoves;
    // } else if (comp) {
    //     winner = "comp"
    //     winningMove = winMoves;
    // } else if (tie) {
    //     winner = "tie"
    // }
    let plays = tictac.reduce((a, e, i) =>
     (e === playerz) ? a.concat(i) : a, []);
    let winner = null;
    for (let [index, win] of winMoves.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            winner = {index: index, playerz: playerz};
            break;
        }
    }
    return winner
}

function availableSquare() {
    return tictac.filter(d => typeof d == "number");
}

function compTurn(/*callBack*/) {
    // let turnTaken = false;
    // while (!turnTaken) {
    //     let num = Math.floor[Math.random() * 8];
    //     if (tictac[num] === 0) {
    //         tictac[num] = comp;
    //         turnTaken = true;
    //     }
    // }
    var as = availableSquare();
    tictac[as[Math.floor(Math.random() * as.length)]] = comp;
    // check(callBack);
}

function tie() {
    if (availableSquare().length == 0) {
        // winner("Tie Game")
        return true;
    }
    return false;
}

app.use(bodyParser.json());
app.get('/', function (req, res) {
    return res.sendFile('/Users/lawrenceanderson/Desktop/dev/game/tic/client/index.html');
});

app.get('/:path', function (req, res) {
    return res.sendFile('/Users/lawrenceanderson/Desktop/dev/game/tic/client/' + req.params.path);
});

app.post('/turn', (req, res) => {
    const playerMove = req.body.playerMove
    funClick(playerMove)
    const playerWon = check(player)
    if (playerWon) {
        return res.send({
            winner: player,
            tictac: tictac
        })
    }; 
    compTurn()
    const compWon = check(comp)
    if (compWon) {
        return res.send({
            winner: comp,
            tictac: tictac
        })
    };
    tie()
    const tieGame = check(tie)
    if (tieGame) {
        return res.send({
            winner: tie,
            tictac: tictac
        })
    }
    return res.send({
        winner: null,
        tictac: tictac
    })
});


app.listen(8080, () => {
    console.log("Server is running on port 8080");
}) 
