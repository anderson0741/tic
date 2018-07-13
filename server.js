const express = require('express');
const app = express();
const http = require('http');
const axios = require('axios');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

function funClick(square) {
    if (typeof tictac[square.target.id] == 'number') {
        if (!turn(square.target.id, player)) {
            if (!tie()) turn(compTurn(), comp);
        }
    }
}

function availableSquare() {
    return tictac.filter(d => typeof d == "number");
}

function compTurn() {
    let as = availableSquare();
    return as[Math.floor(Math.random() * as.length)];
}

app.get('/', (req, res) => {
    res.sendFile('/Users/lawrenceanderson/Desktop/dev/game/tic/index.html');
});

app.post('/', (req, res) => {
    const turn = new turn(req.body);
    compTurn.save((err) => {
        if (err) return res.status(500).send(err);
        // let as = availableSquare();
        // return as[Math.floor(Math.random() * as.length)];
        res.type('.js')
        // res.send("let compTurn = newTurn();")
        res.send(compTurn)
    })
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
}) 