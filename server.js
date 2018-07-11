const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require ('cors')

// mongoose.connect("mongodb://localhost/toe", (err) => {
//     if (err) throw err;
//     console.log("Connected to the TicTacToe Database");
// });

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/toe', require('./routes/toe'));
// Routing
app.get('/toe', function(request, response) {
    response.sendFile(path.join(_comp, 'sctipt.js'))
})


app.listen(8080, () =>{
    console.log("Server is running on port 8080");
}) 