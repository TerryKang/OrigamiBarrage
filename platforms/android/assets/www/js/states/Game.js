
//var self;
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.worldScale = 1;
    this.player;
    this.bgGroup;
    this.viewRect;
    this.boundsPoint;
    this.olddistance;
    this.distancedelta;
    this.distance;
    this.starfield;
    this.frogs;
    this.rabbits;
    this.bulletTimer;
};

BasicGame.Game.prototype = {
    worldScale : this.worldScale,
    player : this.player,
    bgGroup : this.bgGroup,
    viewRect : this.viewRect,
    boundsPoint : this.boundsPoint,
    starfield : this.starfield,
    bullets : this.bullets,
    frogs : this.frogs,
    rabbits : this.rabbits,
    bulletTimer : this.bulletTimer,

	create: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        //this.add.sprite(this.game.width/2, this.game.height/2, 'star');
        //this.time.advancedTiming = true;

        //self = this;
        // add a player sprite to give context to the movement
        //this.player = this.add.graphics(-15, -15);
        //this.player.beginFill(0x00ff00);
        //this.player.drawCircle(0, 0, 30);
        //this.player.endFill();
        
        // set our world size to be bigger than the window so we can move the camera
        //this.world.setBounds(-1000, -1000, 2000, 2000);
        
        // move our camera half the size of the viewport back so the pivot point is in the center of our view
        //this.camera.x = (this.game.width * -0.5);
        //this.camera.y = (this.game.height * -0.5);
        //this.game.input.maxPointers = 2;

        // luxes.
        starfield = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg1');

        player = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'flight');       
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(0.07, 0.07);

        // bullets.
        frogs = this.game.add.group();
        //frogs.scale.set(0.01, 0.01);
        frogs.enableBody = true;
        frogs.physicsBodyType = Phaser.Physics.ARCADE;
        frogs.createMultiple(100, 'frog');
        frogs.setAll('anchor.x', 0.5);
        frogs.setAll('anchor.y', 1);
        frogs.setAll('scale.x', 0.10);
        frogs.setAll('scale.y', 0.10);
        frogs.setAll('outOfBoundsKill', true);
        frogs.setAll('checkWorldBounds', true);

        rabbits = this.game.add.group();
        //rabbits.scale.set(0.01, 0.01);
        rabbits.enableBody = true;
        rabbits.physicsBodyType = Phaser.Physics.ARCADE;
        rabbits.createMultiple(100, 'rabbit');
        rabbits.setAll('anchor.x', 0.5);
        rabbits.setAll('anchor.y', 1);
        rabbits.setAll('scale.x', 0.10);
        rabbits.setAll('scale.y', 0.10);
        rabbits.setAll('outOfBoundsKill', true);
        rabbits.setAll('checkWorldBounds', true);

        cranes = this.game.add.group();
        //rabbits.scale.set(0.01, 0.01);
        cranes.enableBody = true;
        cranes.physicsBodyType = Phaser.Physics.ARCADE;
        cranes.createMultiple(100, 'crane');
        cranes.setAll('anchor.x', 0.5);
        cranes.setAll('anchor.y', 1);
        cranes.setAll('scale.x', 0.10);
        cranes.setAll('scale.y', 0.10);
        cranes.setAll('outOfBoundsKill', true);
        cranes.setAll('checkWorldBounds', true);

        bulletTimer = this.game.time.create(false);
        bulletTimer.loop(1000, this.bulletTimerUpdate, this);
        bulletTimer.start();


	},

    bulletTimerUpdate: function () {
        var bulletType = this.game.rnd.integerInRange(1, 3);
        var bullet;
        if (bulletType == 1)
            bullet = frogs.getFirstExists(false);
        else if (bulletType == 2)
            bullet = rabbits.getFirstExists(false);
        else if (bulletType == 3)
            bullet = cranes.getFirstExists(false);

        if (bullet)
        {
            var bulletSpeed = this.game.rnd.integerInRange(100, 600);
            var factor = this.game.rnd.frac();

            var cx = this.game.width * 0.5;
            var cy = this.game.height * 0.5;
            var centerPoint = new Phaser.Point(cx, cy);
            var bulletPoint = new Phaser.Point(0, 0);

            var side = this.game.rnd.integerInRange(1, 4);
            if (side == 1) // top
            {
                var posX = this.game.width * factor;

                bullet.reset(posX, 0);

                bulletPoint = new Phaser.Point(posX, 0);
            }
            else if (side == 2) // bottom
            {
                var posX = this.game.width * factor;

                bullet.reset(posX, this.game.height);

                bulletPoint = new Phaser.Point(posX, this.game.height);
            }
            else if (side == 3) // left
            {
                var posY = this.game.height * factor;

                bullet.reset(0, posY);

                bulletPoint = new Phaser.Point(0, posY);
            }
            else if (side == 4) // left
            {
                var posY = this.game.height * factor;

                bullet.reset(this.game.width, posY);

                bulletPoint = new Phaser.Point(this.game.width, posY);
            }

            var angle = this.game.math.radToDeg(Phaser.Point.angle(centerPoint, bulletPoint));
            angle = angle;
            bullet.angle = angle + 90;
            console.log(angle);
            game.physics.arcade.velocityFromAngle(bullet.angle - 90, bulletSpeed, bullet.body.velocity);
        }
    },

	update: function () {
        console.log("update");
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        if(this.input.pointer1.isDown && this.input.pointer2.isDown){
            this.olddistance = this.distance;
            this.distance = Phaser.Math.distance(this.input.pointer1.x, this.input.pointer1.y, this.input.pointer2.x, this.input.pointer2.y);
            this.distancedelta = Math.abs(this.olddistance - this.distance);
            console.log("distance delta : " + this.distancedelta);
            if (this.olddistance > this.distance && this.distancedelta > 4 ){ 
                this.zoomOut(); 
            }
            else if (this.olddistance < this.distance && this.distancedelta > 4 ){  
                this.zoomIn(); 
            }
        }

        // luxes.
        //starfield.tilePosition.y += 2;
	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	},
    zoomIn: function(){
        console.log("zoomIn");
        this.worldScale += 0.05;
        // set a minimum and maximum scale value
        this.worldScale = Phaser.Math.clamp(this.worldScale, 0.25, 2);
        
        // set our world scale as needed
        this.world.scale.set(this.worldScale);
        
    },
    zoomOut: function(){
        console.log("zoomOut");
        this.worldScale -= 0.05;
        // set a minimum and maximum scale value
        this.worldScale = Phaser.Math.clamp(this.worldScale, 0.25, 2);
        
        // set our world scale as needed
        this.world.scale.set(this.worldScale);
    }

};
