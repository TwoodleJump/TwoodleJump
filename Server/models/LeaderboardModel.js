const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({
  player: {
    type: String,
    required: true,
  },
  numWins: {
    type: Number,
    required: true,
  },
});

// based on this schema, connect to the respective database collection
const myDB = mongoose.connection.useDb("leaderboard");
const Leaderboard = myDB.model("Leaderboard", LeaderboardSchema);

module.exports = Leaderboard;
