
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	init: function () {
		this.preloadBar = null;
		this.ready = false;
	},

	preload: function () {

		//	These are the assets we loaded in Boot.js				
		this.preloadBar = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloaderBar');		
		this.preloadBar.anchor.setTo(0.5);

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.

		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	You can find all of these assets in the Phaser Examples repository

		this.load.image('starfield', 'assets/images/starfield.png');
		this.load.image('sky', 'assets/images/sky.png');
		this.load.image('ground', 'assets/images/platform.png');
    	this.load.image('star', 'assets/images/star.png');
    	this.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);

    	// luxes.
<<<<<<< HEAD
    	this.load.image('butterfly', 'assets/images/butterfly.png');
    	this.load.image('frog', 'assets/images/frog.png');
    	this.load.image('pinwheel', 'assets/images/pinwheel.png');
    	this.load.image('crane', 'assets/images/crane.png');
=======
    	this.load.image('flight', 'assets/images/resize_plane_pink.png');
    	this.load.image('frog', 'assets/images/resize_frog_remake.png');
    	this.load.image('pinwheel', 'assets/images/pinwheel_remake.png');
    	this.load.image('crane', 'assets/images/resize_crane_blackline.png');
    	this.load.image('butterfly', 'assets/images/butterfly_remake.png');
    	this.load.image('bullet', 'assets/images/bullet.png');
    	this.game.load.spritesheet('explosion', 'assets/images/explode.png', 128, 128);
    	this.game.load.spritesheet('crash', 'assets/images/crash_flight.png', 60, 100);
>>>>>>> 981832fe3b3dc13c379b8ba3812be3cc5cf32438


    	this.load.image('bg1', 'assets/images/bg1.jpeg');

		this.load.image('floor1', 'assets/images/floor1.jpeg');
		this.load.image('floor2', 'assets/images/floor2.jpeg');
		this.load.image('floor3', 'assets/images/floor3.jpeg');

		this.load.image('plane1', 'assets/images/plane1.png');
    	this.load.image('plane2', 'assets/images/plane2.png');



		// Audio track Attribution (menu sci-fi 1.ogg, CC 3.0)
		// Alexandr-Zhelanov: https://soundcloud.com/alexandr-zhelanov 
		//this.load.audio('bgm', ['assets/audio/menusci-fi1.ogg', 'assets/audio/menusci-fi1.mp3']);

		this.load.audio('bgm', ['assets/audio/bgm.ogg', 'assets/audio/bgm.mp3']);
      	this.load.audio('levelchange', ['assets/audio/levelchange.ogg', 'assets/audio/levelchange.mp3']);

	},

	create: function () {


		//this.state.start('MainMenu');


	},
	update: function () {
		if (this.cache.isSoundDecoded('bgm') && this.cache.isSoundDecoded('levelchange') && this.ready == false) {
         this.ready = true;
         this.state.start('MainMenu');
		}
	}

};
