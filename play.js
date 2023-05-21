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

        //create bottle
        this.bottle = this.matter.add.sprite(400, 500, "bottle", null, {
            isStatic: false, 
            chamfer: 0 , 
            render: { sprite: { xOffset: 0, yOffset: 0.30 } }
        }).setBounce(0.3 );
        this.bottle.scaleX = 4;
        this.bottle.scaleY = 4;

        //const Bodies = Phaser.Physics.Matter.Matter.Bodies;
    /*
        this.rectA = Bodies.rectangle(this.bottle.x, this.bottle.y, 25, 75);
        this.rectB = Bodies.rectangle(this.bottle.x, this.bottle.y + 1, 25, 10);

        const compoundBody = Phaser.Physics.Matter.Matter.Body.create({
            parts: [this.rectA, this.rectB]
        });

        this.bottle.setExistingBody(compoundBody);
*/
        this.bottle.body.setMass = 10;
        
        Phaser.Physics.Matter.Matter.Body.setCentre(this.bottle.body, { x: 0, y: 23 }, true);

        //this.matter.add.mouseSpring({ length: 1, stiffness: 0.5 });

        //this.matter.add.worldConstraint(this.bottle, 0, 1);

        //Throw and flip bottle
        this.input.on('pointerdown', () => 
        {
             this.flipDirection = Phaser.Math.Between(0,1);
            this.bottle.setVelocity(0, -15);
        });
    }

    update() {
        console.log(this.bottle.y);
        
        if (this.bottle.y < 450)
        {
            console.log("In the air");
            if(this.flipDirection == 0)
            {
                Phaser.Physics.Matter.Matter.Body.rotate(this.bottle.body, 0.1);
            }
            else
            {
                Phaser.Physics.Matter.Matter.Body.rotate(this.bottle.body, -0.1);
            }
        }
        else
        {
            console.log("On the ground");
            console.log(Phaser.Physics.Matter.Body.getAngularVelocity(this.bottle.body));
        }
        
    }
}