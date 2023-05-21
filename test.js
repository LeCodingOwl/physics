class Test extends Phaser.Scene {
    constructor() {
        super("test");
    }
        preload ()
        {
            this.load.image("bottle", "assets/sprites/bottle.png");
            this.load.image("platform", "assets/sprites/platform.png");
        }
    
        create ()
        {
            const Bodies = Phaser.Physics.Matter.Matter.Bodies;
    
            const rectA = Bodies.rectangle(0, 0, 25, 75);
            const rectB = Bodies.rectangle(0, 25, 25, 10);

            //create platforms
            let ground = this.matter.add.sprite(400, 585, "platform", null, { isStatic: true});
            ground.scaleX = 15;
            ground.scaleY = 1;
    
            const compoundBody = Phaser.Physics.Matter.Matter.Body.create({
                parts: [rectA, rectB]
            });
    
            //const block = this.matter.add.image(400, 0, 'bottle');

            const bottle = this.matter.add.sprite(400, 500, "bottle", null, {
                isStatic: false, 
                chamfer: 0 , 
                render: { sprite: { xOffset: 0, yOffset: 0.30 } }
            }).setBounce(0.3 );
            bottle.scaleX = 4;
            bottle.scaleY = 4;
    
            bottle.setExistingBody(compoundBody);
    
            bottle.setFrictionAir(0.001).setBounce(0.9);

            this.matter.add.mouseSpring({ length: 1, stiffness: 0.5 });
    
        }
}