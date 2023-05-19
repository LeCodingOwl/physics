var config = {
    type: Phaser.Auto,
    width: 800,
    height: 600,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'matter',
      matter: {
        gravity: { y: 0.9},
        debug: true
      }
    },
    scene: [Play]
  }
  
  var game = new Phaser.Game(config);