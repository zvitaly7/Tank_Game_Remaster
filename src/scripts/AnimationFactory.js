/** Here realization of animations from Sprite factory as Base */
import {Sprite} from "./Sprite";
import {Animation} from "./Animation";
import {SpriteFactory} from "./Sprite-Factory";


export function AnimationFactory(imageName, imageWidth, imageHeight, spriteWidth, spriteHeight,data) {
    SpriteFactory.call(this, imageName, imageWidth, imageHeight, spriteWidth, spriteHeight);
    this.sequences = this.getSequences(data);

}

AnimationFactory.prototype = Object.create(SpriteFactory.prototype);
AnimationFactory.prototype.constructor = AnimationFactory;

AnimationFactory.prototype.getSequences = function (data) {
    const dataMap = data;
    const sequences = {};
    dataMap.layers.forEach(layer => {
        sequences[layer.name] = layer.data.filter(i => i > 0);
    });
    return sequences;
};

AnimationFactory.prototype.getAnimation = function (name, speed = 100, repeat = true, autorun = true) {
    return SpriteFactory.prototype.getAnimation.call(this, this.sequences[name], speed, repeat, autorun);

};