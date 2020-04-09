/** Here i make some sprites */

import {Sprite} from "./Sprite";
import {Animation} from "./Animation";

export function SpriteFactory(imageName, imageWidth, imageHeight, spriteWidth, spriteHeight) {
    this.imageName = imageName;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
}

SpriteFactory.prototype.getSprite = function (index) {
    return new Sprite(
        this.imageName,
        this.getSourceX(index),
        this.getSourceY(index),
        this.spriteWidth,
        this.spriteHeight
    );
};

SpriteFactory.prototype.getAnimation = function (indexes, speed, repeat = true, autorun = true) {
    return new Animation(
        this.imageName,
        indexes.map(index => ({sx: this.getSourceX(index), sy: this.getSourceY(index)})),
        speed,
        repeat,
        autorun,
        this.spriteWidth,
        this.spriteHeight
    );
};


SpriteFactory.prototype.getSourceX = function (index) {

    return (--index * this.spriteWidth) % this.imageWidth;
};
SpriteFactory.prototype.getSourceY = function (index) {
    return Math.trunc((--index * this.spriteWidth) / this.imageWidth) * this.spriteHeight;
};


