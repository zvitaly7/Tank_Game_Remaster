import {Bullet} from "./Bullet";

export function EnemyAi(x, y) {
    this.duration = 2000;
    this.direction = "down";
    this.lastTime = 0;
    this.body = null;
    this.bullets = [];
    this.x = x;
    this.y = y;
}


EnemyAi.prototype.changeDirection = function () {
    this.direction = "down,up,left,right".split(',')[Math.floor(Math.random() * 4)];
};

EnemyAi.prototype.update = function (time) {

    if ((time - this.lastTime) > this.duration) {
        this.changeDirection();
        this.lastTime = time;
        this.shooting();
    }


    this.body.moving(this.direction);
    this.bullets.forEach(bullet => bullet.update(time));
};


EnemyAi.prototype.control = function (body) {
    this.body = body;
};

EnemyAi.prototype.shooting = function () {
    if (Date.now() - this.lastFire > 200) {
        this.bullets.push(new Bullet(this.direction, 150, 100, this.body.x + 15, this.body.y + 15));
    }
    this.lastFire = Date.now();
};
