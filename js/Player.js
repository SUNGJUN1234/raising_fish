export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let {scene, x, y, texture, frame} = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x, this.y, 12, {isSensor: false, label: "playerCollider"});
        var playerSensor = Bodies.circle(this.x, this.y, 24, {isSensor: true, label: "playerSensor"});
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir : 0.35,
        });
        this.setExistingBody(compoundBody);

        // 캐릭터가 돌아가지 않도록 설정
        this.setFixedRotation();
    }

    static preload(scene) {
        scene.load.atlas('knight', 'assets/images/knight.png', 'assets/images/knight_atlas.json');
        scene.load.animation('knight_anim', 'assets/images/knight_anim.json')
    }

    get velocity() {
        return this.body.velocity;
    }

    update() {
        const speed =  2.5;
        let playerVelocity = new Phaser.Math.Vector2();

        // 키보드 입력 처리
        if (this.inputKeys.left.isDown || this.cursors.left.isDown) {
            playerVelocity.x = -1;
        } else if (this.inputKeys.right.isDown || this.cursors.right.isDown) {
            playerVelocity.x = 1;
        }

        if (this.inputKeys.up.isDown || this.cursors.up.isDown) {
            playerVelocity.y = -1;
        } else if (this.inputKeys.down.isDown || this.cursors.down.isDown) {
            playerVelocity.y = 1;
        }

        // 대각선 이동 보정
        if (playerVelocity.x !== 0 && playerVelocity.y !== 0) {
            playerVelocity.normalize();
        }

        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);

        if(Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
            this.anims.play('knight_walk', true);
        }else {
            this.anims.play('knight_idle', true)
        }
    }
}