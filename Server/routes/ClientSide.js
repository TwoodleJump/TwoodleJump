const express = require("express");
const app = express();

var path = require('path');

app.use('/client', express.static(path.join(__dirname, '../../Client')));

// Loads Menus
app.get("/", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../../Client/Submenus/Main_Menu/index.html'));
  } catch (error) {
    res.status(404).send({message: error.message})
  }
})

app.get('/CreateGameScreen', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../../Client/Submenus/Create_Game/index.html'));
  } catch (error) {
    res.status(404).send({message: error.message})
  }
});

// Loads levels
app.get('/LevelOne', (req, res) => {
  app.use(express.static(path.join(__dirname, '/../../Client/Phaser')))
  app.use(express.static(path.join(__dirname, '/../../Client/Phaser/LevelOne')))
  res.sendFile(path.join(__dirname, '../../Client/Phaser/LevelOne/index.html'));
});

app.get('/LevelTwo', (req, res) => {
  app.use(express.static(path.join(__dirname, '/../../Client/Phaser')))
  app.use(express.static(path.join(__dirname, '/../../Client/Phaser/LevelTwo')))
  res.sendFile(path.join(__dirname, '../../Client/Phaser/LevelTwo/index.html'));
});

app.get('/LevelThree', (req, res) => {
  app.use(express.static(path.join(__dirname, '/../../Client/Phaser')))
  app.use(express.static(path.join(__dirname, '/../../Client/Phaser/LevelThree')))
  res.sendFile(path.join(__dirname, '../../Client/Phaser/LevelThree/index.html'));
});



module.exports = app;