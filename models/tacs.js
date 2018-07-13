const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const tacSchema = new mongoose.Schema({
    "tictac": String,
    "winMoves": Number,
    "startGame": Number,
    "funClick": String,
    "turn": String,
    check: String,
    gameOver: String,
    Winner: String,
    availableSquare: Number,
    compTurn: Number,
    tie: String
});

module.exports = mongoose.model("Tac", tacSchema);