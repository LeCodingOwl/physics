class Play extends Phaser.Scene {
    constructor() {
        super("play");

    }

    bottle;

    preload() {
        this.load.image("bottle", "assets/sprites/bottle.png");
        this.load.image("platform", "assets/sprites/platform.png");
        this.load.image("background", "assets/background/sky.png");
    }

    create() {
        // Define the range of angles considered upright
        this.uprightAngleRange = 10;
        // Define a threshold for velocity to determine if the object is moving
        this.velocityThreshold = 0.1;
        //sets toss and landing
        this.hasFlip = false;

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

        this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
        this.line = new Phaser.Geom.Line(400, 300, 200, 10);

        //const Bodies = Phaser.Physics.Matter.Matter.Bodies;
        this.bottle.body.setMass = 10;
        
        Phaser.Physics.Matter.Matter.Body.setCentre(this.bottle.body, { x: 0, y: 23 }, true);

        //this.matter.add.mouseSpring({ length: 1, stiffness: 0.5 });

        //Throw and flip bottle
        this.input.on('pointerdown', () => 
        {
             this.flipDirection = Phaser.Math.Between(0,1);
            this.bottle.setVelocity(0, -15);
            this.hasFlip = true;
        });

        this.scoreText = this.add.text(10, 10, 'Score: 0', 
        {
            font: '24px Arial',
            fill: '#ffffff'
        });
        this.score = 0;

    }

    update() {
        let isUpright = Math.abs(this.bottle.angle) <= this.uprightAngleRange;
        let isObjectMoving = Math.abs(this.bottle.body.velocity.x) > this.velocityThreshold || Math.abs(this.bottle.body.velocity.y) > this.velocityThreshold;
        //console.log(Math.abs(this.bottle.angle))
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
            if (this.hasFlip)
            {
                if (!isObjectMoving)
                {
                    if (isUpright)
                    {
                        console.log("The bottle is upright");
                        this.hasFlip = false;
                        this.score ++;
                        this.scoreText.setText('Score: ' + this.score);
                    }
                }
            }

        }
        
    }
}