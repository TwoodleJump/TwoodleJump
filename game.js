var config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.Fit,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [LevelOne]
};

var game = new Phaser.Game(config);