const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const tacSchema = new mongoose.Schema({
    // "name": String,
    // "type": String,
    // "reward": Number,
    // "photo": String,
    // "alive": Boolean
});

module.exports = mongoose.model("Tac", tacSchema);