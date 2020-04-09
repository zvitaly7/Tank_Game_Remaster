import {Sprite} from "./Sprite";
import {Scene} from "./Scene";


export function Animation(imageName, frames, speed, repeat, autorun, width, height) {
    Sprite.call(this, imageName,frames[0].sx,frames[0].sy,width, height );
    this.frames = frames;
    this.speed = speed;
    this.repeat = repeat;
    this.running = autorun;
    this.lastTime = 0;
    this.currentFrame = 0;
    this.totalFrames = this.frames.length;
    this.onEnd = null;
}

Animation.prototype = Object.create(Sprite.prototype);
Animation.prototype.constructor = Animation;

Animation.prototype.setFrame = function (index) {
    this.currentFrame = index;
    this.sourceX = this.frames[index].sx;
    this.sourceY = this.frames[index].sy;
};
Animation.prototype.run = function () {
    if (!this.running) {
        this.setFrame(0);
        this.running = true;
    }
};

Animation.prototype.stop = function () {
    this.running = false;
};

Animation.prototype.nextFrame = function () {
    if ((this.currentFrame + 1) === this.totalFrames) {
        if (this.onEnd) {
            this.onEnd();
        }
        if (this.repeat) {
            this.setFrame(0);
            return;
        }
        this.stop();
        return;
    }
    this.setFrame(this.currentFrame + 1);
};

Animation.prototype.update = function (time) {
    if (!this.running) {
        return;
    }
    if (this.lastTime === 0) {
        this.lastTime = time;
        return;
    }
    if ((time - this.lastTime) > this.speed) {
        this.nextFrame();
        this.lastTime = time;
    }
};