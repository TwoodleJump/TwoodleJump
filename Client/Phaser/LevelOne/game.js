// Load the menu screen before starting the Phaser game
window.onload = function() {
    var menuScreen = document.getElementById("menu-screen");
    var playButton = document.getElementById("play-button");
    var loadButton = document.getElementById("load-button");
  
    playButton.onclick = function() {
      menuScreen.style.display = "none";
      startGame();
    }
    loadButton.onclick = function() {
        menuScreen.style.display = "none";
        /*Whatever load does*/ 
        //Maybe this if we want to make a whole new page. If not we can make a drop down menu
        //The href is just a random name made. Have not implemented the dropdown yet.
        window.location.href = "input.html";
    
        // startGame();
    }
  }
  

  /*This should set the configuration for the Phaser game instance and create the game object.
  When the user clicks the play button on the menu screen, the startGame() function is called, 
  which creates the Phaser game object using the configuration defined in the main JavaScript file.
  */
  function startGame() {
    var config = {
      type: Phaser.AUTO,
      mode: Phaser.Scale.Fit,
      width: 1280,
      height: 720,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scale: {
        parent: 'myGame',
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: [LevelOne]
    };
  
    var game = new Phaser.Game(config);
  }

//Original Code 
// var config = {
//     type: Phaser.AUTO,
//     mode: Phaser.Scale.Fit,
//     width: 1280,
//     height: 720,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 300 },
//             debug: false
//         }
//     },
//     scale: {
//         autoCenter: Phaser.Scale.CENTER_BOTH
//     },
//     scene: [LevelOne]
// };

// var game = new Phaser.Game(config);
