var platformsGroup;
var itemsGroup;
var platform;
var item;
var floor;
var timer

class LevelOne extends Phaser.Scene {
    constructor(){
        super("First_level");
        this.floor;
        this.cursors;
        this.pastTime = Date.now();

        this.player1;
        this.player2;

        this.leader;
        this.itemStart;

        this.player1ItemStart;
        this.player1Speed = false;
        this.player1Backwards = false;
        this.player1SuperJump = false;

        this.player2ItemStart;
        this.player2Speed = false;
        this.player2Backwards = false;
        this.player2SuperJump = false;
    }

    // Loads assets into the game. The first parameter is what string that will be used to access the asset
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('item', 'assets/item.png');
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
        if (!this.player1Backwards){
            this.playerOneMoves() //Checks for player 1 movements
        } else {
            this.playerOneMovesBackwards() //Checks for player 1 movements but makes them backwards (for powerup)
        }

        if (!this.player2Backwards){
            this.playerTwoMoves(keys); //Checks for player 2 movements
        } else {
            this.playerTwoMovesBackwards(keys); //Checks for player 2 movements but makes them backwards (for powerup)
        }
 
        this.changeCamera(); // Changes the camera based on who is higher
        this.wrapPlayers(); // Allows players to wrap around the map
        this.spawnItem(); // Spawns items around the map every 10 seconds
        this.checkPowerUpTime(); // Removes powerups from players if they've been active longer than the treshhold

    }

    // Controls up down left right moves for player one
    playerOneMoves() {
        if (this.cursors.left.isDown && !this.player1Speed) {
            this.player1.setVelocityX(-250);
            this.player1.anims.play('left', true);
        } else if (this.cursors.right.isDown  && !this.player1Speed) {
            this.player1.setVelocityX(250);
            this.player1.anims.play('right', true);
        } else if (this.cursors.left.isDown && this.player1Speed) {
            this.player1.setVelocityX(-450);
            this.player1.anims.play('left', true);
        } else if (this.cursors.right.isDown  && this.player1Speed){
            this.player1.setVelocityX(450);
            this.player1.anims.play('right', true);
        }
        else {
            this.player1.setVelocityX(0);
            this.player1.anims.play('turn');
        }

        // Make sure that player is touching ground before they can jump
        if (this.cursors.up.isDown && this.player1.body.touching.down && !this.player1SuperJump) { 
            this.player1.setVelocityY(-580);
        } else if (this.cursors.up.isDown && this.player1.body.touching.down && this.player1SuperJump){
            this.player1.setVelocityY(-700);
        }
    }

    // Controls WASD moves for player Two
    playerTwoMoves(keys) {        
        if (keys.A.isDown && !this.player2Speed) {
            this.player2.setVelocityX(-250);
            this.player2.anims.play('left', true);
        } else if (keys.D.isDown && !this.player2Speed) {
            this.player2.setVelocityX(250);
            this.player2.anims.play('right', true);
        } else if (keys.A.isDown && this.player2Speed){
            this.player2.setVelocityX(-450);
            this.player2.anims.play('left', true);
        } else if (keys.D.isDown && this.player2Speed){
            this.player2.setVelocityX(450);
            this.player2.anims.play('right', true);
        } else {
            this.player2.setVelocityX(0);
            this.player2.anims.play('turn');
        }

        // Make sure that player is touching ground before they can jump
        if (keys.W.isDown && this.player2.body.touching.down && !this.player2SuperJump) {
            this.player2.setVelocityY(-580);
        } else if (keys.W.isDown && this.player2.body.touching.down && this.player2SuperJump){
            this.player2.setVelocityY(-700);
        }
    }

    // Controls up down left right moves for player one
    playerOneMovesBackwards() {
        if (this.cursors.left.isDown && !this.player1Speed) {
            this.player1.setVelocityX(250);
            this.player1.anims.play('right', true);
        } else if (this.cursors.right.isDown  && !this.player1Speed) {
            this.player1.setVelocityX(-250);
            this.player1.anims.play('left', true);
        } else if (this.cursors.left.isDown && this.player1Speed) {
            this.player1.setVelocityX(450);
            this.player1.anims.play('right', true);
        } else if (this.cursors.right.isDown  && this.player1Speed){
            this.player1.setVelocityX(-450);
            this.player1.anims.play('left', true);
        }
        else {
            this.player1.setVelocityX(0);
            this.player1.anims.play('turn');
        }

        // Make sure that player is touching ground before they can jump
        if (this.cursors.up.isDown && this.player1.body.touching.down && !this.player1SuperJump) { 
            this.player1.setVelocityY(-580);
        } else if (this.cursors.up.isDown && this.player1.body.touching.down && this.player1SuperJump){
            this.player1.setVelocityY(-700);
        }
    }

    // Controls WASD moves for player Two
    playerTwoMovesBackwards(keys) {        
        if (keys.A.isDown && !this.player2Speed) {
            this.player2.setVelocityX(250);
            this.player2.anims.play('right', true);
        } else if (keys.D.isDown && !this.player2Speed) {
            this.player2.setVelocityX(-250);
            this.player2.anims.play('left', true);
        } else if (keys.A.isDown && this.player2Speed){
            this.player2.setVelocityX(450);
            this.player2.anims.play('right', true);
        } else if (keys.D.isDown && this.player2Speed){
            this.player2.setVelocityX(-450);
            this.player2.anims.play('left', true);
        } else {
            this.player2.setVelocityX(0);
            this.player2.anims.play('turn');
        }

        // Make sure that player is touching ground before they can jump
        if (keys.W.isDown && this.player2.body.touching.down && !this.player2SuperJump) {
            this.player2.setVelocityY(-580);
        } else if (keys.W.isDown && this.player2.body.touching.down && this.player2SuperJump){
            this.player2.setVelocityY(-700);
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
        if (this.player1.body.position.y < this.player2.body.position.y && this.player1.body.position.y < game.config.height/4){
            this.leader = this.player1;
            this.cameras.main.centerOnY(this.player1.body.position.y + 200);
        } else if (this.player2.body.position.y < this.player1.body.position.y && this.player2.body.position.y < game.config.height/4) {
            this.cameras.main.centerOnY(this.player2.body.position.y + 200);
            this.leader = this.player2;
        }
    }

    // Creates platforms and ground for player to stand on
    createEnvironment(){
        // Creates platforms for players to jump on
        this.createPlatforms();
        this.createItems();

        // Adds floor to map
        this.floor = this.physics.add.staticGroup();
        this.floor.create(game.config.width/2, 750, 'ground').setScale(1).refreshBody();

        this.physics.add.overlap(this.floor, itemsGroup, this.removeBadItem, null, this);
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
        this.physics.add.overlap(this.player1, itemsGroup, this.itemCollectP1, null, this);

        this.player2.body.setGravityY(300); // Sets gravity for player
        this.player2.setCollideWorldBounds(true); // Stops sprite from running off the stage
        this.physics.add.collider(this.player2, this.floor); // Makes player not fall through floor
        this.physics.add.collider(this.player2, platformsGroup); // Makes player not fall through platform
        this.physics.add.overlap(this.player2, itemsGroup, this.itemCollectP2, null, this);

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
    
    createItems() {
        itemsGroup = this.physics.add.staticGroup();
        itemsGroup.enableBody = true;
    }

    // Creates platforms
    createPlatforms(){
        platformsGroup = this.physics.add.staticGroup();
		platformsGroup.enableBody = true;
        this.physics.add.overlap(platformsGroup, itemsGroup, this.removeBadItem, null, this);
		// Spawns 1000 tiles going up
		for( var i = 0; i<1000; i++){
			this.spawnPlatform( Phaser.Math.Between( 150, this.physics.world.bounds.width - 150 ), this.physics.world.bounds.height - 200 - 200 * i, 'platform');
		}
        this.physics.add.overlap(platform, itemsGroup, this.removeBadItem, null, this);
	} 

    // Adds tile to platformsGroup and spawns it
    spawnPlatform(x, y, type){
		platform = platformsGroup.create(x, y, type);
		platform.setImmovable();
        platform.setScale(.5).refreshBody();
		return platform;
	}

    spawnItem(){
        // Determines if 8 seconds have passed
        let currTime = Date.now()

        if (Date.now() - this.pastTime >= 1000 * 8){
    
            // Spawns an item around the person who is in first place
                if (this.leader == this.player1){
                    item = itemsGroup.create(Phaser.Math.Between(this.player1.body.position.x - 200, this.player1.body.position.x + 200 ), Phaser.Math.Between(this.player1.body.position.y - 400, this.player1.body.position.y + 400 ), 'item');
                } else {
                    item = itemsGroup.create(Phaser.Math.Between(this.player2.body.position.x - 200, this.player2.body.position.x + 200 ), Phaser.Math.Between(this.player2.body.position.y - 400, this.player2.body.position.y + 400 ), 'item');
                }
            item.setImmovable();
            item.setScale(.6).refreshBody();

            this.pastTime = currTime;
            return item;

        }
	}

    removeBadItem(ground, item){
        item.disableBody(true,true);
    }

    // Creates continuous background with 1280x720 background photo
    createBackground(){
        for(var i = 0; i < 1000; i++){
            this.add.image(game.config.width/2, game.config.height/2 - (game.config.height * i), 'sky'); // Adds the background photo to center of screen
        }
    }

    // Randomly chooses an item for p1 if they touch an item block
    itemCollectP1(player, item){
        item.disableBody(true,true);

        // If player 1 has no powerups activates currently
        if (!this.player1Speed && !this.player1SuperJump && !this.player2Backwards){
            let itemSelector = Phaser.Math.Between(0, 100);
            this.player1ItemStart = Date.now();

            // Sets powerup to true and marks the time when it was turned on
            if (itemSelector <= 33){
                console.log("turning on super speed for p1")
                this.player1Speed = true;
                this.player1ItemStart = Date.now();
            } else if (itemSelector <= 66) {
                console.log("turning on super jump for p1")
                this.player1SuperJump = true;
                this.player1ItemStart = Date.now();
            } else {
                console.log("turning on backwards controls for p2")
                this.player2Backwards = true;
                this.player1ItemStart = Date.now();
            }
        }

    }

    // Randomly chooses an item for p2 if they touch an item block
    itemCollectP2(player, item){
        item.disableBody(true,true);

        // If player 2 has no powerups activates currently
        if (!this.player2Speed && !this.player2SuperJump && !this.player1Backwards){
            let itemSelector = Phaser.Math.Between(0, 100);
            this.player2ItemStart = Date.now();

            // Sets powerup to true and marks the time when it was turned on
            if (itemSelector <= 33){
                console.log("turning on super speed for p2")
                this.player2Speed = true;
                this.player2ItemStart = Date.now();
            } else if (itemSelector <= 66) {
                console.log("turning on super jump for p2")
                this.player2SuperJump = true;
                this.player2ItemStart = Date.now();
            } else {
                console.log("turning on backwards controls for p1")
                this.player1Backwards = true;
                this.player2ItemStart = Date.now();
            }
        }
    }

    // Turns off powerups after they hit their limit
    checkPowerUpTime(){
        let currTime = Date.now();

        // If player 1 has an item active currently
        if (this.player1Speed || this.player1SuperJump || this.player2Backwards){
            // If item has been active for 7 seconds or more, disable item
            if (currTime - this.player1ItemStart >= 1000 * 7){
                this.player1Speed = false;
                this.player1SuperJump = false;
                this.player2Backwards = false;
                console.log("turning off powerups for player1")
            }
        }

        // If player 2 has an item active currently
        if (this.player2Speed || this.player2SuperJump || this.player1Backwards){
            // If item has been active for 7 seconds or more, disable item
            if (currTime - this.player2ItemStart >= 1000 * 7){
                this.player2Speed = false;
                this.player2SuperJump = false;
                this.player1Backwards = false;
                console.log("turning off powerups for player2")
            }
        }
    }
}
