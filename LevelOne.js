var tilesGroup;
var tile;
var floor;

class LevelOne extends Phaser.Scene {
    constructor(){
        super("First_level");
        this.floor;
        this.cursors;
        this.player;
        this.player2;
    }

    // Loads assets into the game. The first parameter is what string that will be used to access the asset
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    // Puts those assets and such into the game
    create () {
        this.createEnvironment(); // Spawns in platforms and ground
        this.createPlayers(); // Spawns in players
        this.initCameras();
    }

    // Continually runs. Listens for players input.
    update () {        
        // In essence a event listener that listens for keyboard presses
        this.cursors = this.input.keyboard.createCursorKeys();

        var keys = this.input.keyboard.addKeys("W,A,S,D"); // Allows character to be moved with WASD
        this.playerOneMoves();
        this.playerTwoMoves(keys);
        this.changeCamera();
    }

    // Controls up down left right moves for player one
    playerOneMoves() {

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-250);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(250);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        // Make sure that player is touching ground before they can jump
        if (this.cursors.up.isDown && this.player.body.touching.down) { //&& this.player.body.touching.down) 
            this.player.setVelocityY(-500);
        }
        // if (this.cursors.up.isDown && Phaser.Input.Keyboard.JustDown(this.cursors.up)){
        //     this.player.setVelocityY(-300);
        // }
    }

    // Controls WASD moves for player Two
    playerTwoMoves(keys) {        
        if (keys.A.isDown) {
            this.player2.setVelocityX(-250);
            this.player2.anims.play('left', true);
        }
        else if (keys.D.isDown) {
            this.player2.setVelocityX(250);
            this.player2.anims.play('right', true);
        }
        else {
            this.player2.setVelocityX(0);
            this.player2.anims.play('turn');
        }

        // Make sure that player is touching ground before they can jump
        if (keys.W.isDown && this.player2.body.touching.down) {
            this.player2.setVelocityY(-500);
        }
    }

    // Changes who the camera follows depending who is higher up in the level
    changeCamera(){
        // Determines what player is higher. Camera locks onto the higher player
        // Second part of conditional is for keeping the camera from going below the screen when the game starts
        //    Makes sure that a player is far enough up the screen before the camera starts following
        if (this.player.body.position.y < this.player2.body.position.y && this.player.body.position.y < game.config.height/2){
            this.cameras.main.centerOnY(this.player.body.position.y);
        } else if (this.player2.body.position.y < this.player.body.position.y && this.player2.body.position.y < game.config.height/2) {
            this.cameras.main.centerOnY(this.player2.body.position.y);
        }
    }

    // Creates platforms and ground for player to stand on
    createEnvironment(){
        // Adds background photo to map
        this.add.image(400, 300, 'sky'); 
        this.createTiles();
        
        // Adds floor to map
        this.floor = this.physics.add.staticGroup();
        this.floor.create(400, 568, 'ground').setScale(2).refreshBody();
        
    }

    initCameras(){
        this.cameras.main.centerOnX(game.config.width/2); // Locks camera to center of stage
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height, true, true, false, true); // Makes the stage infinite
    }

    createPlayers(){
        this.player = this.physics.add.sprite(500, 450, 'dude');
        this.player2 = this.physics.add.sprite(100, 450, 'dude');

        this.player.body.setGravityY(300); // Sets gravity for player
        this.player.setCollideWorldBounds(true); // Stops sprite from running off the stage
        this.physics.add.collider(this.player, this.floor); 
        this.physics.add.collider(this.player, tilesGroup); 


        this.player2.body.setGravityY(300); // Sets gravity for player
        this.player2.setCollideWorldBounds(true); // Stops sprite from running off the stage
        this.physics.add.collider(this.player2, this.floor); 
        this.physics.add.collider(this.player2, tilesGroup); 


        // Do this when character runs left
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), // Chooses the frames from the frame sheet
            frameRate: 10, // fps
            repeat: -1 // Tells animation to loop
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20 // fps
        });

        // Do this when character runs left
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10, // fps
            repeat: -1 // Tells animation to loop
        });
    }

    createTiles(){
        tilesGroup = this.physics.add.staticGroup();
		tilesGroup.enableBody = true;
		
		// spawnTile();
		for( var i = 0; i<1000; i++){
			this.spawnTile( Phaser.Math.Between( 25, this.physics.world.bounds.width - 25 ), this.physics.world.bounds.height - 200 - 200 * i, 'ground');
		}
	} 

    spawnTile(x, y, type){
		tile = tilesGroup.create(x, y, type);
		tile.setImmovable();
		return tile;
	}
}
