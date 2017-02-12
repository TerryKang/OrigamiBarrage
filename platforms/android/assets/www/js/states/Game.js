
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
    this.background;
    this.floor;
    this.originalBounds = [];
    this.originalBackground = [];
    this.isZooming;
};

BasicGame.Game.prototype = {

	create: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.time.advancedTiming = true;

        
        this.floor = 3;
        this.background = this.game.add.sprite(0, 0, "floor3");
        this.background.x = 0;
        this.background.y = 0;
        this.background.height = this.game.height;
        this.background.width = this.game.width;
/*
        this.originalBackground.height = this.background.height;
        this.originalBackground.width = this.background.width;
        this.originalBackground.height = this.background.height;
        this.originalBackground.width = this.background.width;
*/
        this.player = this.game.add.sprite(this.world.centerX, this.world.centerY,"star");
        this.player.anchor.setTo(0.5);


        //self = this;
        // add a player sprite to give context to the movement
        //this.player = this.add.graphics(-15, -15);
        //this.player.beginFill(0x00ff00);
        //this.player.drawCircle(0, 0, 30);
        //this.player.endFill();
        
        // set our world size to be bigger than the window so we can move the camera
        //this.world.setBounds(-1000, -1000, 2000, 2000);
        
        // move our camera half the size of the viewport back so the pivot point is in the center of our view
        this.camera.follow(this.player);

        this.game.input.maxPointers = 2;
        this.isZooming = false;

	},

	update: function () {
        console.log("update");
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        if(this.input.pointer1.isDown && this.input.pointer2.isDown){
            this.olddistance = this.distance;
            this.distance = Phaser.Math.distance(this.input.pointer1.x, this.input.pointer1.y, this.input.pointer2.x, this.input.pointer2.y);
            this.distancedelta = Math.abs(this.olddistance - this.distance);
            console.log("distance delta : " + this.distancedelta);
            if (!this.isZooming && this.olddistance > this.distance && this.distancedelta > 5 ){ 
                this.zoomOut(); 
            }
            else if (!this.isZooming && this.olddistance < this.distance && this.distancedelta > 5 ){  
                this.zoomIn(); 
            }
        }


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
            this.floor++;
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
            this.floor--;
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
        this.player.x = this.world.centerX;
        this.player.y = this.world.centerY;
        this.camera.bounds.height = this.game.height * val;
        this.camera.bounds.width = this.game.width * val;
    },
    changeMap: function(){
        if(this.floor<1){
            this.floor = 1;
        }else if(this.floor>3){
            this.floor = 3;
        }
        this.background.loadTexture('floor' + this.floor);
    }
};
