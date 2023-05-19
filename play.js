class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.image("bottle", "assets/sprites/bottle.png");
        this.load.image("platform", "assets/sprites/platform.png");
        this.load.image("background", "assets/background/sky.png");
    }

    create() {
        this.matter.world.setBounds();
        //create background
        let background = this.add.sprite(400, 300, "background");

        //create platforms
        let ground = this.matter.add.sprite(400, 585, "platform", null, { isStatic: true});
        ground.scaleX = 15;
        ground.scaleY = 1;

        //create sprite bottle
        this.bottle = this.matter.add.sprite(400, 100, "bottle", null, {
            isStatic: false, 
            chamfer: 0 , 
            render: { sprite: { xOffset: 0, yOffset: 0.30 } }
        }).setBounce(0.4);
        this.bottle.scaleX = 4;
        this.bottle.scaleY = 4;

        //bottle.body.setMass = 200;
        
        Phaser.Physics.Matter.Matter.Body.setCentre(this.bottle.body, { x: 0, y: 23 }, true);

        //this.matter.add.mouseSpring({ length: 1, stiffness: 0.5 });


        //Throw and flip bottle
        this.input.on('pointerdown', () => 
        {
            this.bottle.setVelocity(0, -15);
        });
    }

    update() {
        console.log(this.bottle.velocity);
        
        if (this.bottle.velocity < -15)
        {
            Phaser.Physics.Matter.Matter.Body.rotate(this.bottle.body, 0.1);
        }
    }
}