const express = require("express");
const LeaderboardModel = require("../models/LeaderboardModel");
const app = express();

//PUT
app.put("/players/update/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const player = await LeaderboardModel.findById({ _id: id });
    if (!player) {
      return res
        .status(404)
        .send({ message: `Player with ID ${id} not found` });
    }
    player.player = req.body.player || player.player;
    // increment number of wins of player by 1
    if (!player.numWins) player.numWins = 0;
    player.numWins++;

    const updatedPlayer = await player.save();

    res.send(updatedPlayer);
  } catch (error) {
    console.error(error);
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
  const players = new LeaderboardModel(req.body);

  try {
    await players.save();
    res.send(players);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = app;
