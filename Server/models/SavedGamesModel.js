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
    type: Number,
    required: true,
  },
  passcode: {
    type: Number,
  },
});

// based on this schema, connect to the respective database collection
const myDB = mongoose.connection.useDb("test");
const SavedGame = myDB.model("SavedGame", SavedGameSchema);

module.exports = SavedGame;
