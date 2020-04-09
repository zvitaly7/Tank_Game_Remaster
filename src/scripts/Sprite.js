/** My base object of Sprite */

export function Sprite(imageName, sourceX, sourceY, width, height) {
    this.imageName = imageName;
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
}

Sprite.prototype.setXY = function (x, y) {
    this.x = x;
    this.y = y;
};