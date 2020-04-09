import {Tank} from "./Tank";
import {PlayerTank} from "./PlayerTank";
import {EnemyAi} from "./EnemyAI";


export function EnemyTank(imageName, speed,x,y) {
    Tank.call(this, imageName, speed,x,y);
    this.ai = new EnemyAi(x,y);
    this.ai.control(this);
    this.bullets = this.ai.bullets;
    this.damage = 0;
    this.active = true;
}

EnemyTank.prototype = Object.create(Tank.prototype);
EnemyTank.prototype.constructor = EnemyTank;

EnemyTank.prototype.update = function (time) {
        this.ai.update(time);
        Tank.prototype.update.call(this,time);
};