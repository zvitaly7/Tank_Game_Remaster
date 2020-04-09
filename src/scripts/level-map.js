/** My level map realization */
import {Sprite} from "./Sprite";
import {Animation} from "./Animation";
import {Scene} from "./Scene";

export function LevelMap(props) {
    Sprite.call(this, props.imageName, props.sourceX, props.sourceY, props.width, props.height);
    this.hitboxes = props.hitboxes || [];

}

LevelMap.prototype = Object.create(Sprite.prototype);
LevelMap.prototype.constructor = LevelMap;