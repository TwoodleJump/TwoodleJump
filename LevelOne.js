class LevelOne extends Phaser.Scene {
    constructor(){
        super("First_level");
        this.platforms;
        this.cursors;
        this.player;
        this.player2;
    }

    // Loads assets into the game. The first parameter is what string that will be used to access the asset
    preload()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create ()
    {
        this.add.image(400, 300, 'sky'); // Adds background photo to map
        
        // Dynamic means it can move around
        // Static means it stays still
        // platforms serves as a group. This is, in a sense, a class
        this.platforms = this.physics.add.staticGroup();

        // Set scale increases the size of the ground to fit the entire screen
        // refreshBody is telling the game that there has been a change to the platform
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        // In essence a event listener that listens for keyboard presses
        this.cursors = this.input.keyboard.createCursorKeys();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(500, 450, 'dude');
        this.player2 = this.physics.add.sprite(100, 450, 'dude');

        this.player.body.setGravityY(-20); // Sets gravity for player
        this.player.setBounce(0.2); // After jumping, the sprite will bounce slightly
        this.player.setCollideWorldBounds(true); // Stops sprite from running off the stage
        this.physics.add.collider(this.player, this.platforms); 


        this.player2.body.setGravityY(-20); // Sets gravity for player
        this.player2.setBounce(0.2); // After jumping, the sprite will bounce slightly
        this.player2.setCollideWorldBounds(true); // Stops sprite from running off the stage
        this.physics.add.collider(this.player2, this.platforms); 

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

    update ()
    {        
        var keys = this.input.keyboard.addKeys("W,A,S,D"); // Allows character to be moved with WASD
        this.playerOneMoves();
        this.playerTwoMoves(keys);
    }

    // Controls up down left right moves for player one
    playerOneMoves() {

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        // Make sure that player is touching ground before they can jump
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }

    // Controls WASD moves for player Two
    playerTwoMoves(keys) {        
        if (keys.A.isDown)
        {
            this.player2.setVelocityX(-160);
            this.player2.anims.play('left', true);
        }
        else if (keys.D.isDown)
        {
            this.player2.setVelocityX(160);
            this.player2.anims.play('right', true);
        }
        else
        {
            this.player2.setVelocityX(0);
            this.player2.anims.play('turn');
        }

        // Make sure that player is touching ground before they can jump
        if (keys.W.isDown && this.player2.body.touching.down)
        {
            this.player2.setVelocityY(-330);
        }
    }
}
