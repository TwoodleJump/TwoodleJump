const express = require("express");
const SavedGameModel = require("../models/SavedGamesModel");
const app = express();

//POST
app.post("/create_game", async (req, res) => {
  const players = new SavedGameModel(req.body);

  try {
    await players.save();
    res.send(players);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//PUT
app.put("/players/update/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const players = await SavedGameModel.findById({ _id: id });
    if (!players) {
      return res.status(404).send({ message: `Game with ID ${id} not found` });
    }

    players.player1 = req.body.player1 || players.player1;
    players.player2 = req.body.player2 || players.player2;
    players.player1Wins = req.body.player1Wins || players.player1Wins;
    players.player2Wins = req.body.player2Wins || players.player2Wins;
    players.passcode = req.body.passcode || players.passcode;

    const updatedPlayers = await players.save();

    res.send(updatedPlayers);
  } catch (error) {
    console.error(err);
    res.status(500).send({ message: error.message });
  }
});

//GET
app.get("/players", async (req, res) => {
  const players = await SavedGameModel.find({});

  try {
    res.send(players);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//DELETE
app.delete("/players/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSavedGame = await SavedGameModel.findOneAndDelete({ _id: id });

    if (!deletedSavedGame) {
      return res.status(404).send({ message: `Game with ID ${id} not found` });
    }

    res.status(200).send(deletedSavedGame);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = app;
