
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
    this.butterfly;
    this.bulletTimer;
    this.layers = [];
    this.isZooming;
<<<<<<< HEAD
    this.isSwiping;
    this.swipe;
    this.music;
    this.levelSound;
    this.tabTimer;
    this.mainLayer;
    this.playerVelocity;
=======
    this.isSwiping; 
    this.startX;
    this.startY;
    this.endX;
    this.endY;
    this.cursors;
    this.ACCLERATION = 600;
    this.DRAG = 400;
    this.MAXSPEED = 400;
    this.PLAYER_SCALE = 0.06;
    this.bank;
    this.playerTrail;
    this.bullets;
    this.playerBulletTimer;
    this.BULLET_SPEED = 400;
    this.BULLET_ELAPSE = 300;
    this.PLAYER_BOUND = 40;
    this.MIN_ENEMY_SPACING = 300;
    this.MAX_ENEMY_SPACING = 3000;
    this.explosions;
    this.crashes;
    this.FROG_SPEED = 100;
    this.BUTTERFLY_SPEED = 300;
    this.PINWHEEL_SPEED = 400;
    this.CRANE_SPEED = 600;
>>>>>>> 981832fe3b3dc13c379b8ba3812be3cc5cf32438
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
        this.levelSound = this.add.audio('levelchange');
		this.music = this.add.audio('bgm');
        this.music.loop = true;
        this.music.play();


        this.swipe = new Swipe(this.game);

        this.time.advancedTiming = true;

        this.background = this.game.add.sprite(0, 0, "floor3");
        this.background.x = 0;
        this.background.y = 0;
        this.background.height = this.game.height;
        this.background.width = this.game.width;

        this.game.input.maxPointers = 2;
        this.isZooming = false;
        this.isSwiping = false;


        // luxes.
<<<<<<< HEAD
        this.player = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'plane2');       
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(1, 0.75);
=======
        this.player = this.add.sprite(this.world.centerX, this.game.height - 70, 'plane3');       
        this.player.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.maxVelocity.setTo(this.MAXSPEED, this.MAXSPEED);
        this.player.body.drag.setTo(this.DRAG, this.DRAG);
        this.player.scale.setTo(this.PLAYER_SCALE, this.PLAYER_SCALE);

        // player's bullets.
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        // explosions.
        this.explosions = game.add.group();
        this.explosions.enableBody = true;
        this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
        this.explosions.createMultiple(30, 'explosion');
        this.explosions.setAll('anchor.x', 0.5);
        this.explosions.setAll('anchor.y', 0.5);
        this.explosions.forEach( function(explosion) {
            explosion.animations.add('explosion');
        });

        this.crashes = game.add.group();
        this.crashes.enableBody = true;
        this.crashes.physicsBodyType = Phaser.Physics.ARCADE;
        this.crashes.createMultiple(30, 'crash');
        this.crashes.setAll('anchor.x', 0.5);
        this.crashes.setAll('anchor.y', 0.5);
        this.crashes.forEach( function(crash) {
            crash.animations.add('crash');
        });

        this.playerBulletTimer = this.game.time.create(false);
        this.playerBulletTimer.loop(this.BULLET_ELAPSE, this.fireBullet, this);
        this.playerBulletTimer.start();

>>>>>>> 981832fe3b3dc13c379b8ba3812be3cc5cf32438
        this.camera.follow(this.player);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.playerVelocity=400;


        // enemies.
        this.frogs = this.game.add.group();
        this.frogs.enableBody = true;
        this.frogs.physicsBodyType = Phaser.Physics.ARCADE;
        this.frogs.createMultiple(100, 'frog');
        this.frogs.setAll('anchor.x', 0.5);
        this.frogs.setAll('anchor.y', 0.5);
<<<<<<< HEAD
        //this.frogs.setAll('scale.x', 0.10);
        //this.frogs.setAll('scale.y', 0.10);
=======
>>>>>>> 981832fe3b3dc13c379b8ba3812be3cc5cf32438
        this.frogs.setAll('outOfBoundsKill', true);
        this.frogs.setAll('checkWorldBounds', true);

        this.pinwheels = this.game.add.group();
        this.pinwheels.enableBody = true;
        this.pinwheels.physicsBodyType = Phaser.Physics.ARCADE;
        this.pinwheels.createMultiple(100, 'pinwheel');
        this.pinwheels.setAll('anchor.x', 0.5);
        this.pinwheels.setAll('anchor.y', 0.5);
<<<<<<< HEAD
        //this.pinwheels.setAll('scale.x', 0.10);
        //this.pinwheels.setAll('scale.y', 0.10);
=======
>>>>>>> 981832fe3b3dc13c379b8ba3812be3cc5cf32438
        this.pinwheels.setAll('outOfBoundsKill', true);
        this.pinwheels.setAll('checkWorldBounds', true);

        this.cranes = this.game.add.group();
        this.cranes.enableBody = true;
        this.cranes.physicsBodyType = Phaser.Physics.ARCADE;
        this.cranes.createMultiple(100, 'crane');
        this.cranes.setAll('anchor.x', 0.5);
        this.cranes.setAll('anchor.y', 0.5);
<<<<<<< HEAD
        //this.cranes.setAll('scale.x', 0.10);
        //this.cranes.setAll('scale.y', 0.10);
=======
>>>>>>> 981832fe3b3dc13c379b8ba3812be3cc5cf32438
        this.cranes.setAll('outOfBoundsKill', true);
        this.cranes.setAll('checkWorldBounds', true);

        this.butterfly = this.game.add.group();
<<<<<<< HEAD
        //pinwheels.scale.set(0.01, 0.01);
=======
>>>>>>> 981832fe3b3dc13c379b8ba3812be3cc5cf32438
        this.butterfly.enableBody = true;
        this.butterfly.physicsBodyType = Phaser.Physics.ARCADE;
        this.butterfly.createMultiple(100, 'butterfly');
        this.butterfly.setAll('anchor.x', 0.5);
        this.butterfly.setAll('anchor.y', 0.5);
<<<<<<< HEAD
        //this.cranes.setAll('scale.x', 0.10);
        //this.cranes.setAll('scale.y', 0.10);
        this.butterfly.setAll('outOfBoundsKill', true);
        this.butterfly.setAll('checkWorldBounds', true);


=======
        this.butterfly.setAll('outOfBoundsKill', true);
        this.butterfly.setAll('checkWorldBounds', true);

>>>>>>> 981832fe3b3dc13c379b8ba3812be3cc5cf32438
        this.bulletTimer = this.game.time.create(false);
        this.bulletTimer.loop(1000, this.launchEnemy, this);
        this.bulletTimer.start();


        this.tabTimer = this.time.create();
     	this.tabTimer.add(200, this.endTabTimer,this);

        this.layers[0] =  this.game.add.group();
        this.layers[1] =  this.game.add.group();

        this.layers[0].z = 0;
        this.layers[0].add(this.frogs);
        this.layers[0].add(this.pinwheels);
        this.layers[1].z = 1;
        this.layers[1].add(this.cranes);
        this.layers[1].add(this.butterfly);



        this.mainLayer = this.game.add.group();
        this.mainLayer.add(this.layers[0]);
        this.mainLayer.add(this.layers[1]);

        this.floor = 2;
        this.layers[this.floor-1].add(this.player);
<<<<<<< HEAD
        this.layers[0].setAll('alpha', 0.5);
        this.layers[this.floor-1].setAll('alpha', 1);
        this.mainLayer.sort('z', Phaser.Group.SORT_ASCENDING);


        this.input.onDown.add(this.pressTab, this);

	},

    bulletTimerUpdate: function () {
=======
        this.layers.sort('z', Phaser.Group.SORT_ASCENDING);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.playerTrail = game.add.emitter(this.player.x, this.player.y + 10, 400);
        this.playerTrail.width = 50;
        this.playerTrail.makeParticles('bullet');
        this.playerTrail.setXSpeed(30, -30);
        this.playerTrail.setYSpeed(200, 180);
        this.playerTrail.setRotation(50,-50);
        this.playerTrail.setAlpha(1, 0.01, 800);
        this.playerTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
        this.playerTrail.start(false, 5000, 10);

        //this.launchEnemy();
	},

    fireBullet: function () {
        var bullet = this.bullets.getFirstExists(false);

        if (bullet)
        {
            var bulletOffset = 20 * Math.sin(this.game.math.degToRad(this.player.angle));
            bullet.reset(this.player.x + bulletOffset, this.player.y);
            bullet.angle = this.player.angle;
            this.game.physics.arcade.velocityFromAngle(bullet.angle - 90, this.BULLET_SPEED, bullet.body.velocity);
            bullet.body.velocity.x += this.player.body.velocity.x;
        }
    },

    launchEnemy: function () {
>>>>>>> 981832fe3b3dc13c379b8ba3812be3cc5cf32438
        var bulletType = this.game.rnd.integerInRange(1, 4);
        var bullet;
        var bulletSpeed;
        if (bulletType == 1) {
            bullet = this.frogs.getFirstExists(false);
            bulletSpeed = this.FROG_SPEED;
        }
        else if (bulletType == 2) {
            bullet = this.pinwheels.getFirstExists(false);
            bulletSpeed = this.PINWHEEL_SPEED;
        }
        else if (bulletType == 3) {
            bullet = this.cranes.getFirstExists(false);
<<<<<<< HEAD
        else if (bulletType == 4)
            bullet = this.butterfly.getFirstExists(false);
=======
            bulletSpeed = this.CRANE_SPEED;
        }
        else if (bulletType == 4) {
            bullet = this.butterfly.getFirstExists(false);
            bulletSpeed = this.BUTTERFLY_SPEED;
        }
>>>>>>> 981832fe3b3dc13c379b8ba3812be3cc5cf32438

        if (bullet)
        {
            //var bulletSpeed = this.game.rnd.integerInRange(100, 600);
            var factor = this.game.rnd.frac();

            //var cx = this.world.centerX;
            //var cy = this.world.centerY;
            //var centerPoint = new Phaser.Point(cx, cy);
            var centerPoint = new Phaser.Point(this.player.x, this.player.y);
            var bulletPoint = new Phaser.Point(0, 0);

            var side = this.game.rnd.integerInRange(1, 1);
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
            this.game.physics.arcade.velocityFromAngle(
                bullet.angle - 90, bulletSpeed, bullet.body.velocity);

            //this.game.time.events.add(this.game.rnd.integerInRange(this.MIN_ENEMY_SPACING, this.MAX_ENEMY_SPACING), this.launchEnemy);
        }
    },

	update: function () {

        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        if(this.input.pointer1.isDown){
            if(!this.isSwiping ){
                this.startX = this.input.pointer1.x;
                this.startY = this.input.pointer1.y;
            }else{
                this.endX = this.input.pointer1.x;
		        this.endY = this.input.pointer1.y; 

                // determining x and y distance travelled by mouse/finger from the start
                // of the swipe until the end
                var distX = this.startX-this.endX;
                var distY = this.startY-this.endY;
                // in order to have a vertical swipe, we need that y distance is at least twice the x distance
                // and the amount of vertical distance is at least 10 pixels
                if(Math.abs(distX)>4){
                    // moving up, calling move function with horizontal and vertical tiles to move as arguments
                    if(distX>0){
                        console.log("left");
                        this.player.body.velocity.x -= this.playerVelocity;
                    }
                    // moving down, calling move function with horizontal and vertical tiles to move as arguments
                    else{
                        console.log("right");
                        this.player.body.velocity.x += this.playerVelocity;
                    }
                    this.startX = this.input.pointer1.x;
                    this.startY = this.input.pointer1.y;
                }	    
                if(Math.abs(distY)>4){
                    // moving up, calling move function with horizontal and vertical tiles to move as arguments
                    if(distY>0){
                        this.player.body.velocity.y -= this.playerVelocity;
                    }
                    // moving down, calling move function with horizontal and vertical tiles to move as arguments
                    else{
                        this.player.body.velocity.y += this.playerVelocity;
                    }
                    this.startX = this.input.pointer1.x;
                    this.startY = this.input.pointer1.y;
                }	          
            }
            this.isSwiping = true;

        }else if(this.input.pointer1.isUp){
            if(this.isSwiping){
                this.endX = this.input.pointer1.x;
		        this.endY = this.input.pointer1.y; 

                // determining x and y distance travelled by mouse/finger from the start
                // of the swipe until the end
                var distX = this.startX-this.endX;
                var distY = this.startY-this.endY;

                // in order to have a vertical swipe, we need that y distance is at least twice the x distance
                // and the amount of vertical distance is at least 10 pixels
                if(Math.abs(distX)>4){
                    // moving up, calling move function with horizontal and vertical tiles to move as arguments
                    if(distX>0){
                        console.log("left");
                        this.player.body.velocity.x -= this.playerVelocity;
                    }
                    // moving down, calling move function with horizontal and vertical tiles to move as arguments
                    else{
                        console.log("right");
                        this.player.body.velocity.x = this.playerVelocity;
                    }
                    this.startX = this.input.pointer1.x;
                    this.startY = this.input.pointer1.y;
                }	    
                if(Math.abs(distY)>4){
                    // moving up, calling move function with horizontal and vertical tiles to move as arguments
                    if(distY>0){
                        this.player.body.velocity.y -= this.playerVelocity;
                    }
                    // moving down, calling move function with horizontal and vertical tiles to move as arguments
                    else{
                        this.player.body.velocity.y += this.playerVelocity;
                    }
                    this.startX = this.input.pointer1.x;
                    this.startY = this.input.pointer1.y;
                }	           
            }
            this.isSwiping = false;   
        }
        /*
        var direction = this.swipe.check();
        if (direction!==null) {
        // direction= { x: x, y: y, direction: direction }
            switch(direction.direction) {
                case this.swipe.DIRECTION_LEFT: // do something
                    this.player.body.velocity.x -= 300;
                    break;
                case this.swipe.DIRECTION_RIGHT:
                    this.player.body.velocity.x += 300;
                    break;
                case this.swipe.DIRECTION_UP:
                    this.player.body.velocity.y -= 300;
                    break;
                case this.swipe.DIRECTION_DOWN:
                    this.player.body.velocity.y += 300;
                    break;
                case this.swipe.DIRECTION_UP_LEFT:
                case this.swipe.DIRECTION_UP_RIGHT:
                case this.swipe.DIRECTION_DOWN_LEFT:
                case this.swipe.DIRECTION_DOWN_RIGHT:
                    break;
            }
        }
        */
/*
    //  only move when you click
        if (this.input.pointer1.isDown){
            this.physics.arcade.moveToXY(this.player, this.input.pointer1.x, this.input.pointer1.y, 700, 200);

            if (Phaser.Rectangle.contains(this.player.body, this.input.x, this.input.y))
            {
                console.log("Phaser.Rectangle.contains()");
                this.player.body.velocity.setTo(0, 0);
            }
        }else
        {
            this.player.body.velocity.setTo(0, 0);
        }
*/
                /*
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
        }else if(this.input.pointer1.isDown){
            console.log("isDown");
            if(!this.isSwiping ){
                this.startX = this.input.pointer1.x;
                this.startY = this.input.pointer1.y;
            }else{
                this.endX = this.input.pointer1.x;
		        this.endY = this.input.pointer1.y; 

                // determining x and y distance travelled by mouse/finger from the start
                // of the swipe until the end
                var distX = this.startX-this.endX;
                var distY = this.startY-this.endY;
                                // in order to have a vertical swipe, we need that y distance is at least twice the x distance
                // and the amount of vertical distance is at least 10 pixels
                if(Math.abs(distY)>5){
                    // moving up, calling move function with horizontal and vertical tiles to move as arguments
                    if(distY>0){
                            this.zoomOut();
                    }
                    // moving down, calling move function with horizontal and vertical tiles to move as arguments
                    else{
                            this.zoomIn();
                    }
                }	     
            }
            this.isSwiping = true;

        }else if(this.input.pointer1.isUp){
            console.log("isUp");
            if(this.isSwiping){
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
                if(Math.abs(distY)>5){
                    // moving up, calling move function with horizontal and vertical tiles to move as arguments
                    if(distY>0){
                            this.zoomOut();
                    }
                    // moving down, calling move function with horizontal and vertical tiles to move as arguments
                    else{
                            this.zoomIn();
                    }
                }	           
            }
            this.isSwiping = false;   
        }
*/
        // luxes.
        //starfield.tilePosition.y += 2;
        //this.player.body.acceleration.x = 0;
        this.player.body.velocity.setTo(0, 0);
        this.allStop();

        if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x = -200;
            //this.player.body.acceleration.x = -this.ACCLERATION;
            this.allStart();
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.velocity.x = 200;
            //this.player.body.acceleration.x = this.ACCLERATION;
            this.allStart();
        }

        if (this.player.x > this.game.width - this.PLAYER_BOUND) {
            this.player.x = this.game.width - this.PLAYER_BOUND;
            //this.player.body.acceleration.x = 0;
            this.player.body.velocity.x = 0;
        }
        if (this.player.x < this.PLAYER_BOUND) {
            this.player.x = this.PLAYER_BOUND;
            //this.player.body.acceleration.x = 0;
            this.player.body.velocity.x = 0;
        }

        // Note: The below code is prolly not neccessary.
        this.bank = this.player.body.velocity.x / this.MAXSPEED;
        this.player.scale.x = 1 - Math.abs(this.bank) * 0.5;
        this.player.scale.x *= this.PLAYER_SCALE;
        this.player.angle = this.bank * 5;
        this.playerTrail.x = this.player.x;

        this.game.physics.arcade.overlap(this.player, this.frogs, this.shipCollide, null, this);
        this.game.physics.arcade.overlap(this.player, this.pinwheels, this.shipCollide, null, this);
        this.game.physics.arcade.overlap(this.player, this.cranes, this.shipCollide, null, this);
        this.game.physics.arcade.overlap(this.player, this.butterfly, this.shipCollide, null, this);

        this.game.physics.arcade.overlap(this.frogs, this.bullets, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.pinwheels, this.bullets, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.cranes, this.bullets, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.butterfly, this.bullets, this.hitEnemy, null, this);
	},

    allStop: function () {
        this.frogs.forEach(function(element){
            element.body.enable = false;
        });

        this.pinwheels.forEach(function(element){
            element.body.enable = false;
        });

        this.cranes.forEach(function(element){
            element.body.enable = false;
        });

        this.butterfly.forEach(function(element){
            element.body.enable = false;
        });

        this.bullets.forEach(function(element) {
            element.body.enable = false;
        });
    },

    allStart: function () {
        this.frogs.forEach(function(element){
            element.body.enable = true;
        });

        this.pinwheels.forEach(function(element){
            element.body.enable = true;
        });

        this.cranes.forEach(function(element){
            element.body.enable = true;
        });

        this.butterfly.forEach(function(element){
            element.body.enable = true;
        });

        this.bullets.forEach(function(element) {
            element.body.enable = true;
        });
    },

    hitEnemy: function (enemy, bullet) {
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(bullet.body.x + bullet.body.halfWidth, bullet.body.y + bullet.body.halfHeight);
        explosion.body.velocity.y = enemy.body.velocity.y;
        explosion.alpha = 0.7;
        explosion.play('explosion', 30, false, true);
        enemy.kill();
        bullet.kill()
    },

    shipCollide: function (player, enemy) {
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
        explosion.body.velocity.y = enemy.body.velocity.y;
        explosion.alpha = 0.7;
        explosion.play('explosion', 30, false, true);

        var crash = this.crashes.getFirstExists(false);
        crash.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
        crash.body.velocity.y = player.body.velocity.y;
        crash.alpha = 0.7;
        crash.play('crash', 30, false, true);

        enemy.kill();
    },

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	},
    zoomOut: function(){
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

            for (var i = 0; i < 3; i++)
            {
                if (i != this.floor - 1)
                    this.layers[i].setAll('alpha', 0.5);
                else
                    this.layers[i].setAll('alpha', 1);
            }
        }
        this.scaleMap(this.worldScale);
        
        // set our world scale as needed
        this.isZooming = false;
    },
    zoomIn: function(){
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

            for (var i = 0; i < 3; i++)
            {
                if (i != this.floor - 1)
                    this.layers[i].setAll('alpha', 0.5);
                else
                    this.layers[i].setAll('alpha', 1);
            }
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
        this.layers[this.floor-1].remove(this.player);
        this.layers[this.floor-1].setAll('alpha', 0.5);
        this.floor = (this.floor==1) ? 2 : 1;
        this.layers[this.floor-1].add(this.player);
        this.layers[this.floor-1].setAll('alpha', 1);
        this.background.loadTexture('floor' + this.floor);
        this.player.loadTexture('plane' + this.floor);
        this.levelSound.play();
    },
    endTabTimer: function() {
        this.tabTimer.destroy();
        this.tabTimer = this.time.create();
     	this.tabTimer.add(200, this.endTabTimer,this);
        console.log("stop");
    },
    pressTab: function(){
        if(!this.tabTimer.running){
            this.tabTimer.start();
            console.log("start");
        }
        else{
            this.endTabTimer();
            this.changeMap();
        }
    }

};
