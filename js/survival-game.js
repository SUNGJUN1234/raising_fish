import MainScene from "./MainScene.js";

const config = {
    width: 256,
    height: 256,
    backgroundColor: '#333333',
    type: Phaser.AUTO,
    parent: 'survival-game',
    scene: [MainScene],
    scale: {
        zoom: 2,
    },
    physics: {
        default: "matter",
        matter: {
            debug: true,
            gravity: { y: 0 },
        }
    },
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin,
                key: "matterCollision", 
                mapping: "matterCollision" 
            }
        ]
    }
}

new Phaser.Game(config);