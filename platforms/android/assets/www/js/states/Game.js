
var self;
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
};

BasicGame.Game.prototype = {
    worldScale : this.worldScale,
    player : this.player,
    bgGroup : this.bgGroup,
    viewRect : this.viewRect,
    boundsPoint : this.boundsPoint,

	create: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.add.sprite(this.game.width/2, this.game.height/2, 'star');
        this.time.advancedTiming = true;
/*
        // create a reusable point for bounds checking later
        this.boundsPoint = new Phaser.Point(0, 0);
        // create our reusable view rectangle
        this.viewRect = new Phaser.Rectangle(0, 0, this.game.width, this.game.height);
        
        // create a group for the clippable world objects
        this.bgGroup = this.add.group();
        
        // create a crapload of squares in the world to show movement/zooming
        var sqr, size;
        for (var i = 0; i < 2500; i++) {
            size = this.rnd.integerInRange(5, 20);
            sqr = this.add.graphics(this.rnd.integerInRange(-1000, 1000), this.rnd.integerInRange(-1000, 1000), this.bgGroup);
            sqr.beginFill(0x666666);
            sqr.drawRect(size * -0.5, size * -0.5, size, size); // center the square on its position
            sqr.endFill();
        }
        */
        self = this;
        // add a player sprite to give context to the movement
        this.player = this.add.graphics(-15, -15);
        this.player.beginFill(0x00ff00);
        this.player.drawCircle(0, 0, 30);
        this.player.endFill();
        
        // set our world size to be bigger than the window so we can move the camera
        this.world.setBounds(-1000, -1000, 2000, 2000);
        
        // move our camera half the size of the viewport back so the pivot point is in the center of our view
        this.camera.x = (this.game.width * -0.5);
        this.camera.y = (this.game.height * -0.5);
/*
        // create a hammer instance
        var mc = new Hammer.Manager(document.body);

        // add the pinch recognizer
        mc.add(new Hammer.Pinch({ threshold: 0 }));

        // listen to the events!
        mc.on("pinch", function(ev) { console.log(ev.scale); });
        mc.on("pinchin", this.zoomIn);
        mc.on("pinchout", this.zoomOut);

        // listen to events...
        mc.on("panleft panright tap press", function(ev) {
            console.log(ev.type +" gesture detected.");
        });*/
        this.game.input.maxPointers = 2;

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
            //this.zoomOut(); 
        }/*else if(this.input.pointer1.isDown){
                this.zoomIn(); 
        }*/


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
        
        // do some rudimentary bounds checking and clipping on each object
        // TODO: improve with a quadtree or similar batched approach?
        /*
        this.bgGroup.forEachExists(function(circ) {
            // our simplistic bounds checking; just see if the object's screen position is inside the view rectangle
            // NOTE: this does not use getBounds() as this does not work when setting visible to false
            self.boundsPoint.setTo(
                ((circ.x - self.world.pivot.x) * self.world.scale.x) + (self.game.width * 0.5),
                ((circ.y - self.world.pivot.y) * self.world.scale.y) + (self.game.height * 0.5)
            );
            if (Phaser.Rectangle.containsPoint(self.viewRect, self.boundsPoint)) {
                //we can see this object, so show it
                circ.visible = true;
            }
            else {
                // we can't see this object, so hide it
                circ.visible = false; 
            }
        });*/
    },
    zoomOut: function(){
        console.log("zoomOut");
        this.worldScale -= 0.05;
        // set a minimum and maximum scale value
        this.worldScale = Phaser.Math.clamp(this.worldScale, 0.25, 2);
        
        // set our world scale as needed
        this.world.scale.set(this.worldScale);
        /*
        // do some rudimentary bounds checking and clipping on each object
        // TODO: improve with a quadtree or similar batched approach?
        this.bgGroup.forEachExists(function(circ) {
            // our simplistic bounds checking; just see if the object's screen position is inside the view rectangle
            // NOTE: this does not use getBounds() as this does not work when setting visible to false
            self.boundsPoint.setTo(
                ((circ.x - self.world.pivot.x) * self.world.scale.x) + (self.game.width * 0.5),
                ((circ.y - self.world.pivot.y) * self.world.scale.y) + (self.game.height * 0.5)
            );
            if (Phaser.Rectangle.containsPoint(self.viewRect, self.boundsPoint)) {
                //we can see this object, so show it
                circ.visible = true;
            }
            else {
                // we can't see this object, so hide it
                circ.visible = false; 
            }
        });*/
    }

};
