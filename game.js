var config = {
    type: Phaser.Auto,
    width: 1920,
    height: 1080,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'arcade',
      arcade: {
        //debug: true
        
      }
    },
    scene: [Load, ]
  }
  
  var game = new Phaser.Game(config);