const express = require('express');
const app = express();
const http = require('http');
const axios = require('axios');
const server = require('http').Server(app);
const socket = require('socket.io')(server);
const bodyParser = require('body-parser');

app.use(express.static('.'));

app.get('/', function(req, res) {
    res.sendFile(_dirname + '/index.html');
})

socket.on('connection', function(socketFF){
    socketFF.on('createGame', function(compTurn){
        let as = availableSquare();
        return as[Math.floor(Math.random() * as.length)];
    })
});

app.listen(8080, () =>{
    console.log("Server is running on port 8080");
}) 