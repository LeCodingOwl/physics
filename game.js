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
        debug: false,
      }
    },
    scene: [Play, GameOver]
  }
  
  var game = new Phaser.Game(config);