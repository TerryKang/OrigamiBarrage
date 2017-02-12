
BasicGame.MainMenu = function (game) {

	this.bg;
	this.music = null;
	this.walk;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		this.music = this.add.audio('bgm');
        this.music.loop = true;
        this.music.play();

		this.bg = this.add.sprite(0, 0, 'main_bg');
		this.bg.height = game.height;
		this.bg.width = game.width;

		this.walk = this.bg.animations.add('walk');

		this.bg.animations.play('walk', 1, true);


		var text = this.add.text(this.game.width * 0.5, this.game.height * 0.8, 'Tap to Start!', {
			font: '42px Arial', fill: '#ffffff', align: 'center'
		});
		text.anchor.set(0.5);

		this.input.onDown.add(this.startGame, this);


	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	resize: function (width, height) {

		//	If the game container is resized this function will be called automatically.
		//	You can use it to align sprites that should be fixed in place and other responsive display things.

		this.bg.width = width;
		this.bg.height = height;


	},

	startGame: function () {
		this.music.stop();
		this.state.start("Game");
	}

};
