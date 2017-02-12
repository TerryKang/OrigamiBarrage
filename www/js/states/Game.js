
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
    this.isSwiping;
    this.swipe;
    this.tabTimer;
    this.mainLayer;
    this.playerVelocity;
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
    this.shields;
    this.score = 0;
    this.scoreText;
    this.music_fire;
    this.music_level;
    this.music_bg;
};

BasicGame.Game.prototype = {
	create: function () {

		this.music_bg = this.add.audio('bgm');
        this.music_bg.loop = true;
        this.music_bg.play();
        this.music_fire = this.add.audio('papercrunch');;
        this.music_level = this.add.audio('levelchange');



        this.time.advancedTiming = true;

	    this.background = game.add.tileSprite(0, 0, this.game.width, this.game.height, 'floor3');
        this.background.tileScale.set(game.width/720,game.height/1028);


        this.game.input.maxPointers = 2;
        this.isZooming = false;
        this.isSwiping = false;


        // luxes.
        this.player = this.add.sprite(this.world.centerX, this.game.height - 70, 'plane2');       
        this.player.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.maxVelocity.setTo(this.MAXSPEED, this.MAXSPEED);
        this.player.body.drag.setTo(this.DRAG, this.DRAG);
        this.player.scale.setTo(1, 0.75);
        this.player.health = 100;

        // player's bullets.
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
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
        this.frogs.setAll('outOfBoundsKill', true);
        this.frogs.setAll('checkWorldBounds', true);
        this.frogs.setAll('damageAmount', 20);
        this.frogs.forEach( function(element) {
            element.damageAmount = 20;
        });

        this.pinwheels = this.game.add.group();
        this.pinwheels.enableBody = true;
        this.pinwheels.physicsBodyType = Phaser.Physics.ARCADE;
        this.pinwheels.createMultiple(100, 'pinwheel');
        this.pinwheels.setAll('anchor.x', 0.5);
        this.pinwheels.setAll('anchor.y', 0.5);
        this.pinwheels.setAll('outOfBoundsKill', true);
        this.pinwheels.setAll('checkWorldBounds', true);
        this.pinwheels.forEach( function(element) {
            element.damageAmount = 20;
        });

        this.cranes = this.game.add.group();
        this.cranes.enableBody = true;
        this.cranes.physicsBodyType = Phaser.Physics.ARCADE;
        this.cranes.createMultiple(100, 'crane');
        this.cranes.setAll('anchor.x', 0.5);
        this.cranes.setAll('anchor.y', 0.5);
        this.cranes.setAll('outOfBoundsKill', true);
        this.cranes.setAll('checkWorldBounds', true);
        this.cranes.forEach( function(element) {
            element.damageAmount = 20;
        });

        this.butterfly = this.game.add.group();
        this.butterfly.enableBody = true;
        this.butterfly.physicsBodyType = Phaser.Physics.ARCADE;
        this.butterfly.createMultiple(100, 'butterfly');
        this.butterfly.setAll('anchor.x', 0.5);
        this.butterfly.setAll('anchor.y', 0.5);
        this.butterfly.setAll('outOfBoundsKill', true);
        this.butterfly.setAll('checkWorldBounds', true);
        this.butterfly.setAll('damageAmount', 20);
        this.butterfly.forEach( function(element) {
            element.damageAmount = 20;
        });

        this.bulletTimer = this.game.time.create(false);
        this.bulletTimer.loop(1000, this.launchEnemy, this);
        this.bulletTimer.start();


        this.tabTimer = this.time.create();
     	this.tabTimer.add(200, this.endTabTimer,this);

        this.layers[0] =  this.game.add.group();
        this.layers[1] =  this.game.add.group();


        this.layers[0].z = 1;
        this.layers[0].add(this.frogs);
        this.layers[0].add(this.pinwheels);
        this.layers[1].z = 3;
        this.layers[1].add(this.cranes);
        this.layers[1].add(this.butterfly);



        this.mainLayer = this.game.add.group();
        this.mainLayer.add(this.layers[0]);
        this.mainLayer.add(this.layers[1]);
        this.mainLayer.add(this.player);


        this.floor = 2;
        this.player.z = this.floor;
        this.layers[0].setAll('alpha', 0.5);
        this.layers[this.floor-1].setAll('alpha', 1);
        this.mainLayer.sort('z', Phaser.Group.SORT_ASCENDING);



        //  Shields stat
        this.shields = this.game.add.text(game.world.width - 150, 10,
         'HP: ' + this.player.health +'%', { font: '20px Arial', fill: '#fff' });

        //  Score
        this.scoreText = this.game.add.text(10, 10,
         'Score: ' + this.score, { font: '20px Arial', fill: '#fff' });

        this.input.onDown.add(this.pressTab, this);

	},

    displayHP: function () {
        this.shields.setText("HP: " + this.player.health + "%");
    },

    displayScore: function () {
        this.scoreText.setText("Score: " + this.score);
    },
    fireBullet: function () {
        if (!this.player.alive)
            return;

        var bullet = this.bullets.getFirstExists(false);

        if (bullet)
        {
            var bulletOffset = 20 * Math.sin(this.game.math.degToRad(this.player.angle));
            bullet.reset(this.player.x + bulletOffset, this.player.y);
            bullet.angle = this.player.angle;
            this.game.physics.arcade.velocityFromAngle(bullet.angle - 90, this.BULLET_SPEED, bullet.body.velocity);
            bullet.body.velocity.x += this.player.body.velocity.x;
            this.music_fire.play();
        }
    },

    launchEnemy: function () {
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
            bulletSpeed = this.CRANE_SPEED;
        }
        else if (bulletType == 4) {
            bullet = this.butterfly.getFirstExists(false);
            bulletSpeed = this.BUTTERFLY_SPEED;
        }

        if (bullet)
        {
            var factor = this.game.rnd.frac();

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
        this.background.tilePosition.y += 1;

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
  

        this.game.physics.arcade.overlap(this.layers[this.floor-1], this.bullets, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.player, this.layers[this.floor-1], this.shipCollide, null, this);
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
        bullet.kill();

        this.score += enemy.damageAmount * 10;
        this.displayScore();
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

        player.damage(enemy.damageAmount);
        this.displayHP();
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

        var changeX = this.world.centerX;
        var changeY = this.world.centerY;

        this.background.height = this.game.height * val;
        this.background.width = this.game.width * val;
        this.world.bounds.width = this.game.width * val;
        this.world.bounds.height = this.game.height * val;
        //console.log(gmae.camera);

        changeX = this.world.centerX - changeX;
        changeY = this.world.centerY - changeY;

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
        this.butterfly.forEach(function(item){
            item.x += changeX;
            item.y += changeY;
        });

    },
    changeMap: function(){
        //this.layers[this.floor-1].remove(this.player);
        this.layers[this.floor-1].setAll('alpha', 0.5);
        this.floor = (this.floor==1) ? 2 : 1;
        this.layers[this.floor-1].setAll('alpha', 1);
        this.player.z = this.floor;
        this.mainLayer.sort('z', Phaser.Group.SORT_ASCENDING);

        this.background.loadTexture('floor3');

        this.background.loadTexture('floor' + this.floor);
        this.player.loadTexture('plane' + this.floor);
        this.music_level.play();
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
