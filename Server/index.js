/*
    Config for server side 
*/
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const SavedGames = require("./routes/SavedGamesRoutes");
const Leaderboard = require("./routes/LeaderboardRoutes");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(SavedGames);
app.use(Leaderboard);

/*
    Listening on port 3001 or 5000
*/
app.listen(port, () => console.log(`Listening on port ${port}`));

/*
    Config for mongodb database
*/
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("MongoDB connected!"));
