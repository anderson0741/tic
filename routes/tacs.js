const express = require('express');
const app2 = express.Router();
const Tacs = require('../models/tacs');

app2.get('/', (req, res) => {
    Tacs.find({}, (err, appz) => {
        if (err) return res.status(500).send(err);
        return res.send(appz);
        // return res.sendFile('/Users/lawrenceanderson/Desktop/dev/game/tic/index.html');;
    })
});
app2.post('/', (req, res) => {
    const turn = new turn(req.body);
    tictac.save((err) => {
        if (err) return res.status(500).send(err);
        // let as = availableSquare();
        // return as[Math.floor(Math.random() * as.length)];
        res.send({
            tictac: 'tictac',
            // player: 'player',
            // comp: 'comp',
            winMoves: 'winMoves',
            startGame: 'startGame',
            funClick: 'funClick',
            turn: 'turn',
            check: 'check',
            gameOver: 'gameOver',
            Winner: "Winner",
            availableSquare: 'availableSquare',
            compTurn: 'compTurn',
            tie: 'tie'
        })
    })
});
app2.get('/:id', (req, res) => {
    Tacs.findById(req.params.id, (err, tacs) => {
        if (err) return res.status(500).send(err);
        return res.send(tacs);
    })
});
app2.put('/:id', (req, res) => {
    Tacs.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTacs) => {
        if (err) return res.status(500).send(err);
        return res.send(updatedTacs);
    })
});
app2.delete('/:id', (req, res) => {
    Tacs.findByIdAndRemove(req.params.id, (err, deletedTacs) => {
        if (err) return res.status(500).send(err);
        return res.send(deletedTacs);
    })
});     

module.exports = app2;