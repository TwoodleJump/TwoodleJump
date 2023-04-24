var platformsGroup;
var itemsGroup;
var platform;
var item;
var floor;
var timer


class LevelTwo extends Phaser.Scene {
    constructor(){
        super("Second_level");
        this.getData();
        this.floor;
        this.cursors;
        this.pastTime = Date.now();

        this.player1;
        this.P1Wins;

        this.player2;
        this.P2wins;

        this.leader;
        this.itemStart;

        this.player1Name = sessionStorage.getItem("player1Name");
        this.player1NameText;
        this.player1Wins = 0;
        this.player1ItemStart;
        this.player1Speed = false;
        this.player1Backwards = false;
        this.player1SuperJump = false;
        this.player1ItemText = false;

        this.player2Name = sessionStorage.getItem("player2Name");
        this.player2NameText;
        this.player2Wins = 0;
        this.player2ItemStart;
        this.player2Speed = false;
        this.player2Backwards = false;
        this.player2SuperJump = false;
        this.player2ItemText = false;

        this.displayWinner = false;
        this.displayP1Item = false;
        this.displayP2Item = false;

        this.itemsGroup;
        this.passcode;

        this.displayNames;

        this.jump;
        this.powerup;
        this.song;
        this.mutelogo;
        this.unmutelogo;

        this.getData();
    }

    // Loads assets into the game. The first parameter is what string that will be used to access the asset
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.spritesheet('item', 'assets/itemBox.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('ground', 'assets/ground.png');
        this.load.image('gameoverGray', 'assets/gameoverGray.png')
        this.load.image('unmute', 'assets/unmute.png')
        this.load.image('mute', 'assets/mute.png')
        this.load.audio("jump", ["assets/jump.mp3"])
        this.load.audio("powerup", ["assets/Powerup.mp3"])
        this.load.audio("song", ["assets/coolMountain.mp3"])
        this.load.spritesheet('player1', 
            'assets/blueGuy.png',
            { frameWidth: 64, frameHeight: 72 }
        );
        this.load.spritesheet('player2', 
            'assets/redGuy.png',
            { frameWidth: 64, frameHeight: 72 }
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
        this.updateItemText(); // Make sures the item text is always above the user's head
        this.updateNameText();
        this.checkPowerUpTime(); // Removes powerups from players if they've been active longer than the treshhold
        this.checkNameTime(); // Removes names from player's head after a few seconds
        this.gameOver(); // Checks if the game is complete
        

    }

    getData() {
        const options = {
            method: 'GET'
        }
        
        fetch('/games', options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        }).then(data => {
            // If there is data, look for user
            if(data) {
                // Looks through each saved game for the one with the correct passcode
                for (let i = 0; i < data.length; i++){
                    if (data[i]["passcode"] == sessionStorage.getItem("passcode")){
                        this.player1Name = data[i]["player1"];
                        this.player1Wins = data[i]["player1Wins"];
                        this.player2Name = data[i]["player2"];
                        this.player2Wins = data[i]["player2Wins"];
                    }
                }
            }
        })

        this.passcode = sessionStorage.getItem("passcode");
    }

    // Controls up down left right moves for player one
    playerOneMoves() {
        if (!this.displayWinner){
            // Move left with no speed boost
            if (this.cursors.left.isDown && !this.player1Speed) {
                this.player1.setVelocityX(-350);
                this.player1.anims.play('left1', true);
            // Move right with no speed boost
            } else if (this.cursors.right.isDown  && !this.player1Speed) {
                this.player1.setVelocityX(350);
                this.player1.anims.play('right1', true);

            // Move left with speed boost
            } else if (this.cursors.left.isDown && this.player1Speed) {
                this.player1.setVelocityX(-450);
                this.player1.anims.play('left1', true);
            // Move right with speed boost
            } else if (this.cursors.right.isDown  && this.player1Speed){
                this.player1.setVelocityX(450);
                this.player1.anims.play('right1', true);
            // No Move
            }  else {
                this.player1.setDrag(150);
                this.player1.anims.play('turn1');
            }

            // Make sure that player is touching ground before they can jump
            if (this.cursors.up.isDown && this.player1.body.touching.down && !this.player1SuperJump) { 
                this.jump.play()
                this.player1.setVelocityY(-580);
            } else if (this.cursors.up.isDown && this.player1.body.touching.down && this.player1SuperJump){
                this.jump.play()
                this.player1.setVelocityY(-700);
            }

            // Move down with no speed boost
            if (this.cursors.down.isDown && !this.player1Speed) {
                this.player1.setVelocityY(400);
            // Move down with speed boost
            } else if (this.cursors.down.isDown && this.player1Speed) {
                this.player1.setVelocityY(450);
            }
        }
    }

    // Controls WASD moves for player Two
    playerTwoMoves(keys) {       
        if (!this.displayWinner){
            // Move left with no speed boost
            if (keys.A.isDown && !this.player2Speed) {
                this.player2.setVelocityX(-350);
                this.player2.anims.play('left2', true);
            // Move right with no speed boost
            } else if (keys.D.isDown && !this.player2Speed) {
                this.player2.setVelocityX(350);
                this.player2.anims.play('right2', true);
            // Move left with speed boost
            } else if (keys.A.isDown && this.player2Speed){
                this.player2.setVelocityX(-450);
                this.player2.anims.play('left2', true);
            // Move right with speed boost
            } else if (keys.D.isDown && this.player2Speed){
                this.player2.setVelocityX(450);
                this.player2.anims.play('right2', true);
            // No move
            }  else {
                this.player2.setDrag(150);
                this.player2.anims.play('turn2');
            }

            // Move down with no speed boost
            if (keys.S.isDown && !this.player2Speed) {
                this.player2.setVelocityY(400);
            // Move down with speed boost
            } else if (keys.S.isDown && this.player2Speed) {
                this.player2.setVelocityY(450);
            }

            // Make sure that player is touching ground before they can jump
            if (keys.W.isDown && this.player2.body.touching.down && !this.player2SuperJump) {
                this.jump.play()
                this.player2.setVelocityY(-580);
            } else if (keys.W.isDown && this.player2.body.touching.down && this.player2SuperJump){
                this.jump.play()
                this.player2.setVelocityY(-700);
            }            
        } 

    }

    // Controls up down left right moves for player one
    playerOneMovesBackwards() {
        // Stops user from moving when the game is
        if (!this.displayWinner){
            // Move right with no speed boost
            if (this.cursors.left.isDown && !this.player1Speed) {
                this.player1.setVelocityX(350);
                this.player1.anims.play('right1', true);
            // Move left with no speed boost
            } else if (this.cursors.right.isDown  && !this.player1Speed) {
                this.player1.setVelocityX(-350);
                this.player1.anims.play('left1', true);
            // Move right with speed boost
            }  else if (this.cursors.left.isDown && this.player1Speed) {
                this.player1.setVelocityX(450);
                this.player1.anims.play('right1', true);
            // Move left with speed boost
            } else if (this.cursors.right.isDown  && this.player1Speed){
                this.player1.setVelocityX(-450);
                this.player1.anims.play('left1', true);
            // No Move
            }  else {
                this.player1.setDrag(150);
                this.player1.anims.play('turn1');
            }

            // Move down with no speed boost
            if (this.cursors.down.isDown && !this.player1Speed) {
                this.player1.setVelocityY(400);
            // Move down with speed boost
            } else if (this.cursors.down.isDown && this.player1Speed) {
                this.player1.setVelocityY(450);
            // No moves
            }

            // Make sure that player is touching ground before they can jump
            if (this.cursors.up.isDown && this.player1.body.touching.down && !this.player1SuperJump) { 
                this.jump.play()
                this.player1.setVelocityY(-580);
            } else if (this.cursors.up.isDown && this.player1.body.touching.down && this.player1SuperJump){
                this.jump.play()
                this.player1.setVelocityY(-700);
            }            
        }

    }

    // Controls WASD moves for player Two
    playerTwoMovesBackwards(keys) {     
        if (!this.displayWinner){
            // Move right with no speed boost
            if (keys.A.isDown && !this.player2Speed) {
                this.player2.setVelocityX(350);
                this.player2.anims.play('right2', true);
            // Move left with no speed boost
            } else if (keys.D.isDown && !this.player2Speed) {
                this.player2.setVelocityX(-350);
                this.player2.anims.play('left2', true);
            // Move right with speed boost
            }  else if (keys.A.isDown && this.player2Speed){
                this.player2.setVelocityX(450);
                this.player2.anims.play('right2', true);
            // Move left with speed boost
            } else if (keys.D.isDown && this.player2Speed){
                this.player2.setVelocityX(-450);
                this.player2.anims.play('left2', true);
            // Move down with speed boost
            } else {
                this.player2.setDrag(150);
                this.player2.anims.play('turn2');
            }

            // Move down with no speed boost
            if (keys.S.isDown && !this.player2Speed) {
                this.player2.setVelocityY(400);
            // Move down with speed boost
            } else if (keys.S.isDown && this.player2Speed) {
                this.player2.setVelocityY(450);
            } 

            // Make sure that player is touching ground before they can jump
            if (keys.W.isDown && this.player2.body.touching.down && !this.player2SuperJump) {
                this.jump.play()
                this.player2.setVelocityY(-580);
            } else if (keys.W.isDown && this.player2.body.touching.down && this.player2SuperJump){
                this.jump.play()
                this.player2.setVelocityY(-700);
            }            
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

        this.physics.add.overlap(this.floor, this.itemsGroup, this.removeBadItem, null, this);

        this.createMusic();
    }

    createMusic() {
        this.powerup = this.sound.add("powerup", {loop: false, volume: 0.6});
        this.jump = this.sound.add("jump", {loop: false, volume: 0.3});

        this.song = this.sound.add("song", {loop: true, volume: 0.1});

        // Adds mute/unmute logo and locks it to the screen
        this.muteLogo = this.add.sprite(50, 50, 'mute');
        this.muteLogo.setScale(.3);
        this.muteLogo.setOrigin(0.5, 0.5);
        this.muteLogo.setScrollFactor(0);
        this.muteLogo.fixedToCamera = true;
        this.muteLogo.cameraOffset = {};
        this.muteLogo.cameraOffset.y = 100 - this.cameras.main.scrollY;
        this.muteLogo.setInteractive();
        this.muteLogo.setVisible(false);

        this.unmuteLogo = this.add.sprite(50, 50, 'unmute');
        this.unmuteLogo.setScale(.3);
        this.unmuteLogo.setOrigin(0.5, 0.5);
        this.unmuteLogo.setScrollFactor(0);
        this.unmuteLogo.fixedToCamera = true;
        this.unmuteLogo.cameraOffset = {};
        this.unmuteLogo.cameraOffset.y = 100 - this.cameras.main.scrollY;
        this.unmuteLogo.setInteractive();

        this.muteLogo.on('pointerdown', () => {
            this.jump.volume = .3;
            this.powerup.volume = .6;
            this.song.volume = .1;

            this.unmuteLogo.setVisible(true);
            this.muteLogo.setVisible(false);
        });

        this.unmuteLogo.on('pointerdown', () => {
            this.jump.volume = 0;
            this.powerup.volume = 0;
            this.song.volume = 0;

            this.unmuteLogo.setVisible(false);
            this.muteLogo.setVisible(true);
        });

        // Plays main theme
        this.song.play();
    }

    // Adjusts camera so that it stays within the bounds of the game
    initCameras(){
        this.cameras.main.centerOnX(game.config.width/2); // Locks camera to center of stage
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height, false, false, false, true); // Makes the stage infinite
    }

    // Creates the players, collisions, and animations
    createPlayers(){
        // Spawns players
        this.player1 = this.physics.add.sprite(680, 600, 'player1');
        this.player2 = this.physics.add.sprite(600, 600, 'player2');

        this.player1.body.setGravityY(300); // Sets gravity for player
        this.player1.setCollideWorldBounds(true); // Stops sprite from running off the stage
        this.physics.add.collider(this.player1, this.floor); // Makes player not fall through floor
        this.physics.add.collider(this.player1, platformsGroup); // Makes player not fall through platform
        this.physics.add.overlap(this.player1, this.itemsGroup, this.itemCollectP1, null, this);

        this.player2.body.setGravityY(300); // Sets gravity for player
        this.player2.setCollideWorldBounds(true); // Stops sprite from running off the stage
        this.physics.add.collider(this.player2, this.floor); // Makes player not fall through floor
        this.physics.add.collider(this.player2, platformsGroup); // Makes player not fall through platform
        this.physics.add.overlap(this.player2, this.itemsGroup, this.itemCollectP2, null, this);

        this.physics.add.collider(this.player1, this.player2) //Allows both players to hit eachother 
        
        this.player1ItemText = this.add.text(this.player1.x - 33, this.player1.y - 40, "Player 1")
        this.player2ItemText = this.add.text(this.player2.x - 33, this.player2.y - 40, "Player 2")
        this.player1ItemText.setVisible(false);
        this.player2ItemText.setVisible(false);

        this.player1NameText = this.add.text(this.player1.x - 33, this.player1.y - 40, this.player1Name)
        this.player2NameText = this.add.text(this.player2.x - 33, this.player2.y - 40, this.player2Name)

        this.displayNames = Date.now();

        //Player 1
        // Do this when character runs left
        this.anims.create({
            key: 'left1',
            frames: this.anims.generateFrameNumbers('player1', { start: 17, end: 23 }), // Chooses the frames from the frame sheet
            frameRate: 15, // fps
            repeat: -1 // Tells animation to loop
        });

        // Do this when character isn't moving
        this.anims.create({
            key: 'turn1',
            frames: [ { key: 'player1', frame: 0 } ],
            frameRate: 20 // fps
        });

        // Do this when character runs left
        this.anims.create({
            key: 'right1',
            frames: this.anims.generateFrameNumbers('player1', { start: 4, end: 11 }),
            frameRate: 15, // fps
            repeat: -1 // Tells animation to loop
        });

        this.anims.create({
            key: 'jump1',
            frames: this.anims.generateFrameNumbers('player1', { start: 0, end: 4 }),
            frameRate: 8, // fps
            repeat: -1
        });

        //Player 2
        // Do this when character runs left
        this.anims.create({
            key: 'left2',
            frames: this.anims.generateFrameNumbers('player2', { start: 17, end: 23 }), // Chooses the frames from the frame sheet
            frameRate: 15, // fps
            repeat: -1 // Tells animation to loop
        });

        // Do this when character isn't moving
        this.anims.create({
            key: 'turn2',
            frames: [ { key: 'player2', frame: 0 } ],
            frameRate: 20 // fps
        });

        // Do this when character runs left
        this.anims.create({
            key: 'right2',
            frames: this.anims.generateFrameNumbers('player2', { start: 4, end: 11 }),
            frameRate: 15, // fps
            repeat: -1 // Tells animation to loop
        });


        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('item', { start: 0, end: 6 }), // Chooses the frames from the frame sheet
            frameRate: 10, // fps
            repeat: -1 // Tells animation to loop
        });

        this.anims.create({
            key: 'stop',
            frames: [ { key: 'item', frame: 4 } ],
            frameRate: 20 // fps
        });

    }
    
    // Creates an item group
    createItems() {
        this.itemsGroup = this.add.group();
        this.itemsGroup.enableBody = true;
    }

    // Creates platforms
    createPlatforms(){
        platformsGroup = this.physics.add.staticGroup();
        platformsGroup.enableBody = true;
        this.physics.add.overlap(platformsGroup, this.itemsGroup, this.removeBadItem, null, this);
        // Spawns 1000 tiles going up
        for( var i = 0; i<1000; i++){
            this.spawnPlatform( Phaser.Math.Between( 150, this.physics.world.bounds.width - 150 ), this.physics.world.bounds.height - 200 - 200 * i, 'platform');
        }
        this.physics.add.overlap(platform, this.itemsGroup, this.removeBadItem, null, this);
    } 

    // Adds tile to platformsGroup and spawns it
    spawnPlatform(x, y, type){
        platform = platformsGroup.create(x, y, type);
        platform.setImmovable();
        platform.setScale(.2).refreshBody();
        return platform;
    }

    spawnItem(){
        // Determines if 8 seconds have passed
        if (!this.displayWinner) {
            let currTime = Date.now()

            if (Date.now() - this.pastTime >= 1000 * 8){
        
                // Spawns an item around the person who is losing
                    if (this.leader == this.player1){
                        item = this.physics.add.sprite(Phaser.Math.Between(this.player2.body.position.x - 400, this.player2.body.position.x + 400), Phaser.Math.Between(this.player2.body.position.y - 200, this.player2.body.position.y - 400), 'item').setImmovable(true);
                    } else {
                        item = this.physics.add.sprite(Phaser.Math.Between(this.player1.body.position.x - 400, this.player1.body.position.x + 400), Phaser.Math.Between(this.player1.body.position.y - 200, this.player1.body.position.y - 400), 'item').setImmovable(true);
                    }
                item.body.setAllowGravity(false); // Makes items float
                item.anims.play('spin'); // Starts animation

                this.itemsGroup.add(item);
    
                this.pastTime = currTime;
                return item;
    
            }
        }

    }

    // Makes items not spawn in ground
    removeBadItem(ground, item){
        item.setVisible(true);
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
        if (!this.player1Speed && !this.player1SuperJump && !this.player1Backwards){
            this.powerup.play();
            let itemSelector = Phaser.Math.Between(0, 100);
            this.player1ItemStart = Date.now();

            // Sets powerup to true and marks the time when it was turned on
            if (itemSelector <= 33){
                console.log("turning on super speed for p1")

                this.player1ItemText.setText("Super Speed");
                this.player1ItemText.setVisible(true);

                this.player1Speed = true;
                this.player1ItemStart = Date.now();
            } else if (itemSelector <= 66) {
                console.log("turning on super jump for p1")

                this.player1ItemText.setText("Super Jump");
                this.player1ItemText.setVisible(true);

                this.player1SuperJump = true;
                this.player1ItemStart = Date.now();
            } else {
                console.log("turning on backwards controls for p2")

                this.player2ItemText.setText("Reversed");
                this.player2ItemText.setVisible(true);

                this.player2Backwards = true;
                this.player2ItemStart = Date.now();
            }
        }

    }

    // Randomly chooses an item for p2 if they touch an item block
    itemCollectP2(player, item){
        item.disableBody(true,true);

        // If player 2 has no powerups activates currently
        if (!this.player2Speed && !this.player2SuperJump && !this.player2Backwards){
            this.powerup.play();
            let itemSelector = Phaser.Math.Between(0, 100);
            this.player2ItemStart = Date.now();

            // Sets powerup to true and marks the time when it was turned on
            if (itemSelector <= 33){
                console.log("turning on super speed for p2")
                this.player2Speed = true;

                this.player2ItemText.setText("Super Speed");
                this.player2ItemText.setVisible(true);

                this.player2ItemStart = Date.now();
            } else if (itemSelector <= 66) {
                console.log("turning on super jump for p2")

                this.player2ItemText.setText("Super Jump");
                this.player2ItemText.setVisible(true);

                this.player2SuperJump = true;
                this.player2ItemStart = Date.now();
            } else {
                console.log("turning on backwards controls for p1")

                this.player1ItemText.setText("Reversed");
                this.player1ItemText.setVisible(true);

                this.player1Backwards = true;
                this.player1ItemStart = Date.now();
            }
        }
    }

    // Turns off the names above the players after 5 seconds
    checkNameTime(){
        if (!this.displayWinner){
            let currTime = Date.now();

            if (currTime - this.displayNames >= 1000 * 5){
                this.player1NameText.setVisible(false);
                this.player2NameText.setVisible(false);
            }
        }
    }

    // Turns off powerups after they hit their limit
    checkPowerUpTime(){
        if (!this.displayWinner){
            let currTime = Date.now();

            // If player 1 has an item active currently
            if (this.player1Speed || this.player1SuperJump || this.player1Backwards){
                // If item has been active for 7 seconds or more, disable item
                if (currTime - this.player1ItemStart >= 1000 * 7){
                    this.player1Speed = false;
                    this.player1SuperJump = false;
                    this.player1Backwards = false;
                    console.log("turning off powerups for player1")
                    this.player1ItemText.setVisible(false);
                }
            }

            // If player 2 has an item active currently
            if (this.player2Speed || this.player2SuperJump || this.player2Backwards){
                // If item has been active for 7 seconds or more, disable item
                if (currTime - this.player2ItemStart >= 1000 * 7){
                    this.player2Speed = false;
                    this.player2SuperJump = false;
                    this.player2Backwards = false;
                    console.log("turning off powerups for player2")
                    this.player2ItemText.setVisible(false);
                }
            }
        }
    }

    // Keeps item text above player's head
    updateItemText() {
        this.player1ItemText.x = this.player1.x - 37
        this.player1ItemText.y = this.player1.y - 40

        this.player2ItemText.x = this.player2.x - 37
        this.player2ItemText.y = this.player2.y - 40
    }

    // Keeps name text above player's head
    updateNameText() {
        this.player1NameText.x = this.player1.x - 30
        this.player1NameText.y = this.player1.y - 44

        this.player2NameText.x = this.player2.x - 30
        this.player2NameText.y = this.player2.y - 44
    }

    // Determines what to do once a player wins
    gameOver() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        if (this.player1.body.position.y > this.player2.body.position.y + 550){
            this.physics.pause();

            // Stops text from being off center
            if (!this.displayWinner){
                // Displays winner text
                this.add.image(screenCenterX, screenCenterY, 'gameoverGray').setAlpha(.5).setScale(5);
                this.P2Wins = this.add.text(screenCenterX, screenCenterY, 'Game Over, '+ this.player2Name + ' wins!', {fontSize: '60px', fill: '#000000', backgroundColor: "yellow"});
                this.P2Wins.setOrigin(.5)
                this.displayWinner = true;

                this.player2Wins += 1;
                this.updateWins();

                this.player1.anims.play('turn1');
                this.player2.anims.play('turn2');

                const clickButton = this.add.text(screenCenterX - 90 , screenCenterY + 40, 'Continue?', {fontSize: '35px', fill: '#000000', backgroundColor: "yellow"})
                    .setInteractive()
                    .on('pointerdown', () => this.nextScreen());
            }
        } else if (this.player2.body.position.y > this.player1.body.position.y + 550){
            this.physics.pause();
            
            // Stops text from being off center
            if (!this.displayWinner){
                // Displays winner text
                this.add.image(screenCenterX, screenCenterY, 'gameoverGray').setAlpha(.5).setScale(5);
                this.P1Wins = this.add.text(screenCenterX, screenCenterY, 'Game Over, '+ this.player1Name + ' wins!', {fontSize: '60px', fill: '#000000', backgroundColor: "yellow"});
                this.P1Wins.setOrigin(.5)
                this.displayWinner = true;

                // Updates wins and sends it to database
                this.player1Wins += 1;
                this.updateWins();

                this.player1.anims.play('turn1');
                this.player2.anims.play('turn2');

                const clickButton = this.add.text(screenCenterX - 90, screenCenterY + 40, 'Continue?', {fontSize: '35px', fill: '#000000', backgroundColor: "yellow"})
                    .setInteractive()
                    .on('pointerdown', () => this.nextScreen());
            }
        }
    }

    updateWins() {
        // Prepares data to be posted
        const data = {"player1": this.player1Name, "player2": this.player2Name, "player1Wins": this.player1Wins, "player2Wins": this.player2Wins}
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        let route = '/games/update/' + this.passcode
        // Sends Post
        fetch(route, options);

        sessionStorage.setItem("player1Wins", this.player1Wins);
        sessionStorage.setItem("player2Wins", this.player2Wins);
    }

    // Moves to the next level/endgame screen
    nextScreen(){
        // Goes to level 2
        if ((this.player1Wins + this.player2Wins) == 1) {
            location.href = "/LevelTwo";
        // Goes to level 3
        } else if (this.player1Wins != 2 && this.player2Wins != 2) {
            location.href = "/LevelThree";
        // Goes to End game
        } else {
            location.href = "/WinnerScreen";
        }
    }
}
