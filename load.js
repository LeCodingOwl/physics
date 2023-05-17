class Load extends Phaser.Scene {
    constructor() {
        super("load");
    }

    preload() {
        this.load.image("bottle", "assets/sprites/bottle.png");
    }

    create() {
        let bottle = this.add.sprite(950, 500, "bottle");
        bottle.scaleX = 5;
        bottle.scaleY = 5;
    }
}