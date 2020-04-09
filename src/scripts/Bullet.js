import {Move} from "./Move";
import {SpriteFactory} from "./Sprite-Factory";
import {AnimationFactory} from "./AnimationFactory";


export function Bullet(direction, speed, damage, x, y) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.move = new Move(direction, speed);
    this.lastTime = 0;
    this.active = true;
    this.damage = damage;
    this.sprites = {};
    this.collisionShape = {x: 0, y: 0, width: 10, height: 10};
    this.type = "bullet";

    const images = new SpriteFactory("bullets", 64, 64, 32, 32);

    const animationSheet = new AnimationFactory("explosion", 250, 250, 62, 62, require('./maps/explosion.json'));
    this.animations = animationSheet.getAnimation("explosion", 20, false);


    this.sprites["up"] = images.getSprite(2);
    this.sprites["down"] = images.getSprite(1);
    this.sprites["right"] = images.getSprite(3);
    this.sprites["left"] = images.getSprite(4);
    this.view = this.sprites[direction];
}

Bullet.prototype.update = function (time) {
    if (this.lastTime === 0) {
        this.lastTime = time;
        return;
    }
    this.move.move(this, time - this.lastTime);
    this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
    this.lastTime = time;
    if (this.view === this.animations) {
        this.view.update(time);
        this.view.onEnd = () => {
            this.active = false;

        };
    }
};

Bullet.prototype.explosion = function () {
    this.view = this.animations;
};



