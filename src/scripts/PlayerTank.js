import {SpriteFactory} from "./Sprite-Factory";
import {AnimationFactory} from "./AnimationFactory";
import {Tank} from "./Tank";
import {Sound} from "./Sound";

export function PlayerTank(control, imageName, speed, x, y) {
    Tank.call(this, imageName, speed, x, y);
    this.control = control;
    this.bullets = [];
    this.damage = 0;
    this.sounds = {
        move: new Sound('../src/sound/tank_move.mp3'),
        stand: new Sound('../src/sound/tank.mp3'),
        fire: new Sound('../src/sound/tank-firin.mp3'),
    };
}


PlayerTank.prototype = Object.create(Tank.prototype);
PlayerTank.prototype.constructor = PlayerTank;

PlayerTank.prototype.update = function (time) {
    if (this.control.fire) {
        this.sounds.fire.play();
        this.shoot();
    } else if (this.control.up) {
        this.moving("up");
        this.sounds.move.play();
    } else if (this.control.down) {
        this.moving("down");
        this.sounds.move.play();
    } else if (this.control.left) {
        this.moving("right");
        this.sounds.move.play();
    } else if (this.control.right) {
        this.moving("left");
        this.sounds.move.play();
    } else {
        this.stand(this.move.direction);
        this.sounds.stand.play();
    }

    Tank.prototype.update.call(this, time);

};

PlayerTank.prototype.addBullets = function (bullet, startNumber) {
    for (let i = 0; i < startNumber; i++) {
        this.bullets.push(bullet);
    }
};