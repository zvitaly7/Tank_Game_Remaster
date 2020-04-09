/** My base entity of Tank */

import {Move} from "./Move";
import {AnimationFactory} from "./AnimationFactory";
import {Bullet} from "./Bullet";


export function Tank(imageName, speed, x, y) {
    this.x = x; // position on map
    this.y = y;
    this.speed = speed;
    this.move = new Move("up", 0);
    this.lastTime = 0;
    this.animations = {};
    this.collisionShape = {x: 0, y: 0, width: 60, height: 60}; // some shapes of object in my case sprite
    this.isShooting = false;
    this.lastFire = Date.now();
    this.bullets = [];

    const animationSheet = new AnimationFactory(imageName, 120, 480, 60, 60, require('./maps/player_animations2.json'));
    "player_up,player_down,player_left,player_right".split(",").forEach(name => {
        this.animations[name] = animationSheet.getAnimation(name);
    });

}

Tank.prototype.shoot = function () {

    if (Date.now() - this.lastFire > 200) {
       this.bullets.push(new Bullet(this.move.direction, 300, 50, this.x + 15, this.y + 15));
    }
    this.lastFire = Date.now();
};
Tank.prototype.moving = function (direction) {
    this.move.setDirection(direction, this.speed);
    this.view = this.animations["player_" + direction];
    this.view.run();
};

Tank.prototype.stand = function (direction) {
    this.move.setDirection(direction, 0);
    this.view = this.animations["player_" + direction];
    this.view.stop();
};


Tank.prototype.update = function (time) {
    this.move.move(this, time - this.lastTime);
    this.lastTime = time;
    this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
    this.view.update(time);
};
