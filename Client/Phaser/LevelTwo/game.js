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
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [LevelTwo]
};

var game = new Phaser.Game(config);