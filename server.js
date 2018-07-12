const express = require('express');
const app = express();
const http = require('http');
const axios = require('axios');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');


app.get('/', function(req, res) {
    res.sendFile(_dirname + './index.html');
});

app.post('/', (req, res) => {
    const turn = new turn(req.body);
    newTurn.save((err) => {
        if (err) return res.status(500).send(err);
        return res.send(newTurn);
    })
});

io.on('connection', function(socket){
    socket.on('createGame', function(compTurn){
        let as = availableSquare();
        return as[Math.floor(Math.random() * as.length)];
    })
});

app.listen(8080, () =>{
    console.log("Server is running on port 8080");
}) 