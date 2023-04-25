const express = require("express");
const SavedGameModel = require("../models/SavedGamesModel");
const app = express();

//POST
app.post("/create_game", async (req, res) => {
  // Makes sure passcode hasn't been used before
  const gameExists = await SavedGameModel.exists({ passcode: req.body.passcode });
  if (gameExists){
    return res.status(409).send({message: "Passcode already in use"})
  }

  const players = new SavedGameModel(req.body);
  try {
    await players.save();
    res.send(players);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//PUT
app.put("/games/update/:passcode", async (req, res) => {
  const { passcode } = req.params;

  try {
    const players = await SavedGameModel.findOne({ passcode: passcode });
    if (!players) {
      return res
        .status(404)
        .send({ message: `Game with passcode ${passcode} not found` });
    }

    players.player1 = req.body.player1 || players.player1;
    players.player2 = req.body.player2 || players.player2;
    players.player1Wins = req.body.player1Wins || players.player1Wins;
    players.player2Wins = req.body.player2Wins || players.player2Wins;
    players.passcode = req.body.passcode || players.passcode;

    const updatedPlayers = await players.save();

    res.send(updatedPlayers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//GET
app.get("/games", async (req, res) => {
  const players = await SavedGameModel.find({});

  try {
    res.send(players);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//DELETE
app.delete("/games/:passcode", async (req, res) => {
  const { passcode } = req.params;

  try {
    const deletedSavedGame = await SavedGameModel.findOneAndDelete({
      passcode: passcode,
    });

    if (!deletedSavedGame) {
      return res
        .status(404)
        .send({ message: `Game with passcode ${passcode} not found` });
    }

    res.status(200).send(deletedSavedGame);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = app;
