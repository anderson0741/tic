// import { log } from 'util';

const express = require('express');
const app = express();
const http = require('http');
const axios = require('axios');
const server = require('http').Server(app);
const socket = require('socket.io')(server);
// const path = require('path');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cors = require ('cors')

// mongoose.connect("mongodb://localhost/toe", (err) => {
//     if (err) throw err;
//     console.log("Connected to the TicTacToe Database");
// });

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/toe', require('./routes/toe'));
// Routing
// app.get('/toe', function(request, response) {
//     response.sendFile(path.join(_comp, 'sctipt.js'))
// })
// function onRequest(request, response) {
//     console.log("Request made" + request.url);
//     response.data;
//     resonse.end();
// }

// http.createServer(onRequest).listen(8080);
// console.log("Server running on port 8080");

// axios.get

// $(document).ready(function(){
//     $.get("./client/script.js", function(funClick, status){
//         $.post(turn + gameOver + compTurn);
//     });
// });

// let rooms = 0

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

app.use(express.static('.'));

app.get('/', function(req, res) {
    res.sendFile(_dirname + '/index.html');
})

socket.on('connection', function(socketFF){
    socketFF.on('createGame', function(data){
        socketFF.join('room-' + ++rooms);
        // socetFF.emit('newGame', )
    })
});

function turn(squareId, playerz) {
    tictac[squareId] = playerz;
    document.getElementById(squareId).innerText = playerz;
    let won = check(tictac, playerz);
    if (won) gameOver(won);
    return won;
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

function compTurn() {
    let as = availableSquare();
    return as[Math.floor(Math.random() * as.length)];
}


app.listen(8080, () =>{
    console.log("Server is running on port 8080");
}) 