const mongoose = require("mongoose");

const SavedGameSchema = new mongoose.Schema({
  player1: {
    type: String,
    required: true,
  },
  player2: {
    type: String,
    required: true,
  },
  player1Wins: {
    type: Number,
    required: true,
  },
  player2Wins: {
    type: String,
    required: true,
  },
  passcode: {
    type: Number,
  },
});

const SavedGame = mongoose.model("SavedGame", SavedGameSchema);

module.exports = SavedGame;
