
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
    this.olddistance;
    this.distancedelta;
    this.distance;
    this.starfield;
    this.frogs;
    this.pinwheels;
    this.bulletTimer;
    this.layers = [];
    this.isZooming;
    this.isSwiping; 
    this.startX;
    this.startY;
    this.endX;
    this.endY;
};

BasicGame.Game.prototype = {
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

        this.time.advancedTiming = true;

        this.floor = 3;
        this.background = this.game.add.sprite(0, 0, "floor3");
        this.background.x = 0;
        this.background.y = 0;
        this.background.height = this.game.height;
        this.background.width = this.game.width;

        this.game.input.maxPointers = 2;
        this.isZooming = false;
        this.isSwiping = false;


        // luxes.
        this.player = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'plane3');       
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(0.07, 0.07);

        this.camera.follow(this.player);


        // bullets.
        this.frogs = this.game.add.group();
        //frogs.scale.set(0.01, 0.01);
        this.frogs.enableBody = true;
        this.frogs.physicsBodyType = Phaser.Physics.ARCADE;
        this.frogs.createMultiple(100, 'frog');
        this.frogs.setAll('anchor.x', 0.5);
        this.frogs.setAll('anchor.y', 1);
        this.frogs.setAll('scale.x', 0.10);
        this.frogs.setAll('scale.y', 0.10);
        this.frogs.setAll('outOfBoundsKill', true);
        this.frogs.setAll('checkWorldBounds', true);

        this.pinwheels = this.game.add.group();
        //pinwheels.scale.set(0.01, 0.01);
        this.pinwheels.enableBody = true;
        this.pinwheels.physicsBodyType = Phaser.Physics.ARCADE;
        this.pinwheels.createMultiple(100, 'pinwheel');
        this.pinwheels.setAll('anchor.x', 0.5);
        this.pinwheels.setAll('anchor.y', 1);
        this.pinwheels.setAll('scale.x', 0.10);
        this.pinwheels.setAll('scale.y', 0.10);
        this.pinwheels.setAll('outOfBoundsKill', true);
        this.pinwheels.setAll('checkWorldBounds', true);

        this.cranes = this.game.add.group();
        //pinwheels.scale.set(0.01, 0.01);
        this.cranes.enableBody = true;
        this.cranes.physicsBodyType = Phaser.Physics.ARCADE;
        this.cranes.createMultiple(100, 'crane');
        this.cranes.setAll('anchor.x', 0.5);
        this.cranes.setAll('anchor.y', 1);
        this.cranes.setAll('scale.x', 0.10);
        this.cranes.setAll('scale.y', 0.10);
        this.cranes.setAll('outOfBoundsKill', true);
        this.cranes.setAll('checkWorldBounds', true);

        this.bulletTimer = this.game.time.create(false);
        this.bulletTimer.loop(1000, this.bulletTimerUpdate, this);
        this.bulletTimer.start();


        this.layers[0] =  this.game.add.group();
        this.layers[1] =  this.game.add.group();
        this.layers[2] =  this.game.add.group();

        this.layers[0].add(this.frogs);
        this.layers.z = 0;
        this.layers[1].add(this.pinwheels);
        this.layers.z = 1;
        this.layers[2].add(this.cranes);
        this.layers.z = 2;
        this.layers[2].add(this.player);

        this.layers[this.floor-1].add(this.player);
        this.layers.sort('z', Phaser.Group.SORT_ASCENDING);
	},

    bulletTimerUpdate: function () {
        var bulletType = this.game.rnd.integerInRange(1, 3);
        var bullet;
        if (bulletType == 1)
            bullet = this.frogs.getFirstExists(false);
        else if (bulletType == 2)
            bullet = this.pinwheels.getFirstExists(false);
        else if (bulletType == 3)
            bullet = this.cranes.getFirstExists(false);

        if (bullet)
        {
            var bulletSpeed = this.game.rnd.integerInRange(100, 600);
            var factor = this.game.rnd.frac();

            var cx = this.world.centerX;
            var cy = this.world.centerY;
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
            this.game.physics.arcade.velocityFromAngle(bullet.angle - 90, bulletSpeed, bullet.body.velocity);
        }
    },

	update: function () {
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        if(this.input.pointer1.isDown && this.input.pointer2.isDown){
            this.olddistance = this.distance;
            this.distance = Phaser.Math.distance(this.input.pointer1.x, this.input.pointer1.y, this.input.pointer2.x, this.input.pointer2.y);
            this.distancedelta = Math.abs(this.olddistance - this.distance);
            if (!this.isZooming && this.olddistance > this.distance && this.distancedelta > 5 ){ 
                this.zoomOut(); 
            }
            else if (!this.isZooming && this.olddistance < this.distance && this.distancedelta > 5 ){  
                this.zoomIn(); 
            }
        }else if(!this.isSwiping && this.input.pointer1.isDown){
            console.log("isDown");
            this.isSwiping = true;
            this.startX = this.input.pointer1.x;
            this.startY = this.input.pointer1.y;
        }else if(this.isSwiping && this.input.pointer1.isUp){
            console.log("isUp");
                this.endX = this.input.pointer1.x;
		        this.endY = this.input.pointer1.y; 

                // determining x and y distance travelled by mouse/finger from the start
                // of the swipe until the end
                var distX = this.startX-this.endX;
                var distY = this.startY-this.endY;
                console.log("distY : "+ distY);
                console.log("distX : "+ distX);

                // in order to have a vertical swipe, we need that y distance is at least twice the x distance
                // and the amount of vertical distance is at least 10 pixels
                if(Math.abs(distY)>10){
                    // moving up, calling move function with horizontal and vertical tiles to move as arguments
                    if(distY>0){
                            this.zoomOut();
                    }
                    // moving down, calling move function with horizontal and vertical tiles to move as arguments
                    else{
                            this.zoomIn();
                    }
                }	           
                this.isSwiping = false;   
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
    zoomOut: function(){
        console.log("zoomOut");
        if(this.floor == 3)
            return;
        this.isZooming = true;
        this.worldScale -= 0.05;
        // set a minimum and maximum scale value
        this.worldScale = Phaser.Math.clamp(this.worldScale, 1, 1.5);

        if(this.worldScale<=1 && this.floor < 3){
            this.layers[this.floor-1].remove(this.player);
            this.floor++;
            this.layers[this.floor-1].add(this.player);
            this.changeMap();
            if(this.floor == 3)
                this.worldScale = 1;
            else this.worldScale = 2;
        }
        this.scaleMap(this.worldScale);
        
        // set our world scale as needed
        this.isZooming = false;
    },
    zoomIn: function(){
        console.log("zoomIn");
        if(this.floor == 1)
            return;
        this.isZooming = true;
        this.worldScale += 0.05;
        // set a minimum and maximum scale value
        this.worldScale = Phaser.Math.clamp(this.worldScale, 1, 1.5);
        
        if(this.worldScale>=1.5 && this.floor > 1){
            this.layers[this.floor-1].remove(this.player);
            this.floor--;
            this.layers[this.floor-1].add(this.player);
            this.changeMap();
            this.worldScale = 1;
        }

        // set our world scale as needed
        this.scaleMap(this.worldScale);
        this.isZooming = false;
    },
    render: function(){
            game.debug.cameraInfo(game.camera, 32, 32);
    },
    scaleMap: function(val){
        this.background.height = this.game.height * val;
        this.background.width = this.game.width * val;
        this.world.bounds.width = this.game.width * val;
        this.world.bounds.height = this.game.height * val;
        //console.log(gmae.camera);

        var changeX = this.world.centerX - this.player.x;
        var changeY = this.world.centerY -this.player.y;

        this.player.x = this.world.centerX;
        this.player.y = this.world.centerY;
        this.camera.bounds.height = this.game.height * val;
        this.camera.bounds.width = this.game.width * val;

        this.frogs.forEach(function(frog){
            frog.x += changeX;
            frog.y += changeY;
        });
        this.pinwheels.forEach(function(pinwheel){
            pinwheel.x += changeX;
            pinwheel.y += changeY;
        });
        this.cranes.forEach(function(crane){
            crane.x += changeX;
            crane.y += changeY;
        });

    },
    changeMap: function(){
        this.background.loadTexture('floor' + this.floor);
        this.player.loadTexture('plane' + this.floor);
    }

};
