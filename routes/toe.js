const express = require('express');
const toeRoutes = express.Router();
const Toe = require('../models/toe');

toeRoutes.get('/', (req, res) => {
    Toe.find({}, (err, toez) => {
        if (err) return res.status(500).send(err);
        return res.send(toez);
    })
});
toeRoutes.post('/', (req, res) => {
    const newToe = new Toe(req.body);
    newToe.save((err) => {
        if (err) return res.status(500).send(err);
        return res.send(newToe);
    })
});
toeRoutes.get('/:id', (req, res) => {
    Toe.findById(req.params.id, (err, toe) => {
        if (err) return res.status(500).send(err);
        return res.send(toe);
    })
});
// toeRoutes.put('/:id', (req, res) => {
//     Toe.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedToe) => {
//         if (err) return res.status(500).send(err);
//         return res.send(updatedToe);
//     })
// });
// toeRoutes.delete('/:id', (req, res) => {
//     Toe.findByIdAndRemove(req.params.id, (err, deletedToe) => {
//         if (err) return res.status(500).send(err);
//         return res.send(deletedToe);
//     })
// });     

module.exports = toeRoutes;