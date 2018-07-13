const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const tacSchema = new mongoose.Schema({
    "tictac": String,
    "winMoves": String,
    "startGame": Number,
    "funClick": String,
    "turn": Boolean,
    check: String,
    gameOver: String,
    Winner: String,
    availableSquare: Number,
    compTurn: String,
    tie: String
});

module.exports = mongoose.model("Tac", tacSchema);