// import { log } from '../../../../Library/Caches/typescript/2.6/node_modules/@types/async';

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const axios = require('axios');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

// const player = "X";
// const comp = "O";

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
        if (!turn(square.target.id, player)) {
            if (!tie()) turn(compTurn(), comp);
        }
    }
}

function turn(squareId, playerz) {
    tictac[squareId] = playerz;
    document.getElementById(squareId).innerText = playerz;
    let won = check(tictac, playerz);
    if (won) gameOver(won);
    return won;
}

function check(board, playerz) {
    let plays = board.reduce((a, e, i) =>
        (e === playerz) ? a.concat(i) : a, []);
    let won = null;
    for (let [index, win] of winMoves.entries()) {
        if (win.every(k => plays.indexOf(k) > -1)) {
            won = { index: index, playerz: playerz };
            break;
        }
    }
    return won;
}

// server.gameOver();
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

function Winner(whoWon) {
    document.querySelector('.finish').style.display = "block";
    document.querySelector('.finish .text').innerText = whoWon;
}

function availableSquare() {
    return tictac.filter(d => typeof d == "number");
}

function compTurn() {
    let as = availableSquare();
    return as[Math.floor(Math.random() * as.length)];
}

function tie() {
    if (availableSquare().length == 0) {
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.display.backgroundColor = 'purple';
            boxes[i].removeEventListener('click', funClick, false);
        }
        Winner("Tie Game")
        return true;
    }
    return false;
}


mongoose.connect("mongodb://localhost/tacs", (err) => {
    if (err) throw err;
    console.log("Connected to the Tac Database");
});

app.use(bodyParser.json());
app.use('/tacs', require('./routes/tacs'));

// app.get('/', (req, res) => {
//     res.sendFile('/Users/lawrenceanderson/Desktop/dev/game/tic/index.html');
// });

// app.post('/', (req, res) => {
//     const turn = new turn(req.body);
//     tictac.save((err) => {
//         if (err) return res.status(500).send(err);
//         // let as = availableSquare();
//         // return as[Math.floor(Math.random() * as.length)];
//         res.send({
//             tictac: 'tictac',
//             // player: 'player',
//             // comp: 'comp',
//             winMoves: 'winMoves',
//             startGame: 'startGame',
//             funClick: 'funClick',
//             turn: 'turn',
//             check: 'check',
//             gameOver: 'gameOver',
//             Winner: "Winner",
//             availableSquare: 'availableSquare',
//             compTurn: 'compTurn',
//             tie: 'tie'
//         })
//     })
// });
app.listen(8080, () => {
    console.log("Server is running on port 8080");
}) 
