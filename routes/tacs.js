const express = require('express');
const app2 = express.Router();
const Tacs = require('../models/tacs');

app2.get('/', (req, res) => {
    Tacs.find({}, (err, appz) => {
        if (err) return res.status(500).send(err);
        // return res.send(appz);
        return res.sendFile('/Users/lawrenceanderson/Desktop/dev/game/tic/index.html');;
    })
});
app2.post('/', (req, res) => {
    turn(req.body, function(){
        res.send({
            gameBoard: tictac,
            winner: winner,
            winningMove: winningMove
        })
    });
});
// app2.post('/', (req, res) => {
//     const newTacs = new Tacs(req.body);
//     newTacs.save((err) => {
//         if (err) return res.status(500).send(err);
//         return res.send(newTacs);
//     })
// });
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