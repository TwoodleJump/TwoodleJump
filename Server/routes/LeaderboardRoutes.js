const express = require("express");
const LeaderboardModel = require("../models/LeaderboardModel");
const app = express();

//PUT
app.put("/players/update/:player", async (req, res) => {
  const playerName = req.params.player;
  try {
    const currPlayer = await LeaderboardModel.findOne({ player: playerName });
    if (!currPlayer) {
      return res
        .status(404)
        .send({ message: `Player with name ${player} not found` });
    }

    // increment number of wins of player by 1
    if (!currPlayer.numWins) currPlayer.numWins = 0;
    currPlayer.numWins++;

    const updatedPlayer = await currPlayer.save();

    res.send(updatedPlayer);
  } catch (error) {
<<<<<<< HEAD
=======
    console.error(error);
>>>>>>> a11e2924c22630de39f4fe0164c1d8d49b6bc51f
    res.status(500).send({ message: error.message });
  }
});

//GET
app.get("/players", async (req, res) => {
  const players = await LeaderboardModel.find({});

  try {
    res.send(players);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//POST
app.post("/create_player", async (req, res) => {
  const { player, numWins } = req.body;
  try {
    const existingUser = await LeaderboardModel.findOne({ player });
    if (existingUser) {
      res.status(409).send("A user with that name already exists");
    } else {
      const newPlayer = new LeaderboardModel({ player, numWins });
      await newPlayer.save();
      res.send(newPlayer);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//DELETE
app.delete("/players/delete/:player", async (req, res) => {
  const playerName = req.params.player;
  try {
    const deletedPlayer = await LeaderboardModel.findOneAndDelete({ player: playerName });
    if (!deletedPlayer) {
      return res
        .status(404)
        .send({ message: `Player with name ${player} not found` });
    }
  
    res.status(200).send(deletedPlayer)
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = app;
