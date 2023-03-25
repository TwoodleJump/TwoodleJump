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