const express = require("express");
const app = express();

var path = require('path');

app.use(express.static(path.join(__dirname, '/../../Client/Phaser')))
app.use(express.static(path.join(__dirname, '/../../Client/Phaser/LevelOne')))
app.use(express.static(path.join(__dirname, '/../../Client/Phaser/LevelTwo')))
app.use(express.static(path.join(__dirname, '/../../Client/Phaser/LevelThree')))



app.get("/", async (req, res) => {
    try {
      res.sendFile(path.resolve(__dirname + '/../../Client/Phaser/LevelOne/index.html'));
    } catch (error) {
      res.status(404).send({message: error.message})
    }
  })
  
module.exports = app;