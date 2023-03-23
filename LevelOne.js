var platformsGroup;
var tile;
var floor;

class LevelOne extends Phaser.Scene {
    constructor(){
        super("First_level");
        this.floor;
        this.cursors;
        this.player1;
        this.player2;
    }

    // Loads assets into the game. The first parameter is what string that will be used to access the asset
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.spritesheet('dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    // Puts those assets and such into the game
    create () {
        this.createBackground();
        this.createEnvironment(); // Spawns in platforms and ground
        this.createPlayers(); // Spawns in players
        this.initCameras(); // Makes sure the camera stays locked on the x axis and moves up
    }

    // Continually runs. Listens for players input.
    update () {        
        // In essence an event listener that listens for keyboard presses
        this.cursors = this.input.keyboard.createCursorKeys();

        var keys = this.input.keyboard.addKeys("W,A,S,D"); // Allows character to be moved with WASD
        this.playerOneMoves(); //Checks for player 1 movements
        this.playerTwoMoves(keys); //Checks for player 2 movements
        this.changeCamera(); // Changes the camera based on who is higher
        this.wrapPlayers(); // Allows players to wrap around the map

    }

    // Controls up down left right moves for player one
    playerOneMoves() {
        if (this.cursors.left.isDown) {
            this.player1.setVelocityX(-250);
            this.player1.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player1.setVelocityX(250);
            this.player1.anims.play('right', true);
        }
        else {
            this.player1.setVelocityX(0);
            this.player1.anims.play('turn');
        }

        // Make sure that player is touching ground before they can jump
        if (this.cursors.up.isDown && this.player1.body.touching.down) { 
            this.player1.setVelocityY(-580);
        }
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
            this.player2.setVelocityY(-580);
        }
    }

    // If a player walks off the edge of the map (horizontally), move them to the other side
    wrapPlayers() {
        if (this.player1.body.position.x < 0){
            this.player1.body.position.x = game.config.width
        } else if (this.player1.body.position.x > game.config.width) {
            this.player1.body.position.x = 0
        }

        if (this.player2.body.position.x < 0){
            this.player2.body.position.x = game.config.width
        } else if (this.player2.body.position.x > game.config.width) {
            this.player2.body.position.x = 0
        }
    }

    // Changes who the camera follows depending who is higher up in the level
    changeCamera(){
        // Determines what player is higher. Camera locks onto the higher player
        // Second part of conditional is for keeping the camera from going below the screen when the game starts
        //    Makes sure that a player is far enough up the screen before the camera starts following
        if (this.player1.body.position.y < this.player2.body.position.y && this.player1.body.position.y < game.config.height/2){
            this.cameras.main.centerOnY(this.player1.body.position.y);
        } else if (this.player2.body.position.y < this.player1.body.position.y && this.player2.body.position.y < game.config.height/2) {
            this.cameras.main.centerOnY(this.player2.body.position.y);
        }
    }

    // Creates platforms and ground for player to stand on
    createEnvironment(){
        // Creates platforms for players to jump on
        this.createPlatforms();

        // Adds floor to map
        this.floor = this.physics.add.staticGroup();
        this.floor.create(game.config.width/2, 750, 'ground').setScale(1).refreshBody();
    }

    // Adjusts camera so that it stays within the bounds of the game
    initCameras(){
        this.cameras.main.centerOnX(game.config.width/2); // Locks camera to center of stage
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height, false, false, false, true); // Makes the stage infinite
    }

    // Creates the players, collisions, and animations
    createPlayers(){
        // Spawns players
        this.player1 = this.physics.add.sprite(500, 450, 'dude');
        this.player2 = this.physics.add.sprite(100, 450, 'dude');

        this.player1.body.setGravityY(300); // Sets gravity for player
        this.player1.setCollideWorldBounds(true); // Stops sprite from running off the stage
        this.physics.add.collider(this.player1, this.floor); // Makes player not fall through floor
        this.physics.add.collider(this.player1, platformsGroup); // Makes player not fall through platform

        this.player2.body.setGravityY(300); // Sets gravity for player
        this.player2.setCollideWorldBounds(true); // Stops sprite from running off the stage
        this.physics.add.collider(this.player2, this.floor); // Makes player not fall through floor
        this.physics.add.collider(this.player2, platformsGroup); // Makes player not fall through platform

        this.physics.add.collider(this.player1, this.player2) //Allows both players to hit eachother

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

    // Creates platforms
    createPlatforms(){
        platformsGroup = this.physics.add.staticGroup();
		platformsGroup.enableBody = true;
		
		// Spawns 1000 tiles going up
		for( var i = 0; i<1000; i++){
			this.spawnTile( Phaser.Math.Between( 150, this.physics.world.bounds.width - 150 ), this.physics.world.bounds.height - 200 - 200 * i, 'platform');
		}
	} 

    // Adds tile to platformsGroup and spawns it
    spawnTile(x, y, type){
		tile = platformsGroup.create(x, y, type);
		tile.setImmovable();
        tile.setScale(.5).refreshBody();
		return tile;
	}

    // Creates continuous background with 1280x720 background photo
    createBackground(){
        for(var i = 0; i < 1000; i++){
            this.add.image(game.config.width/2, game.config.height/2 - (game.config.height * i), 'sky'); // Adds the background photo to center of screen
        }
    }
}
