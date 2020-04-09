import {ImageLoader} from "./image-loader";
import {LevelMap} from "./level-map";


export function Screen(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = this.createCanvas(width, height);
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d');
    this.images = {};
    this.isImagesLoaded = false;
}

Screen.prototype.createCanvas = function (width, height) {
    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    document.body.setAttribute("style","width:100%");
    canvas.setAttribute("style","width:99%");
    canvas.width = width;
    canvas.height = height;
    return canvas;

};

Screen.prototype.loadImages = function (imageFiles) {
    const loader = new ImageLoader(imageFiles);
    loader.load().then((names) => {
        this.images = Object.assign(this.images, loader.images);
        this.isImagesLoaded = true;
    });

};
Screen.prototype.fill = function (color) {
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);

};

Screen.prototype.print = function (x, y, text) {
    this.context.fillStyle = "#FFF";
    this.context.font = "22px Arial";
    this.context.fillText(text, x, y);
};

Screen.prototype.drawImage = function (x, y, imageName) {
    this.context.drawImage(this.images[imageName], x, y);
};

Screen.prototype.drawSprite = function (sprite) {
    this.context.drawImage(this.images[sprite.imageName], sprite.sourceX,
        sprite.sourceY, sprite.width, sprite.height,
        sprite.x, sprite.y, sprite.width, sprite.height);
};

Screen.prototype.createMap = function (name, mapData, tileset) {
    const mapImage = document.createElement('canvas');
    mapImage.width = mapData.width * 64;
    mapImage.height = mapData.height * 64;
    const mapContext = mapImage.getContext('2d');
    const hitboxes = [];
    let row, col;
    mapData.layers.forEach(layer => {
        if (layer.type == "tilelayer") {
            row = 0;
            col = 0;
            layer.data.forEach(index => {
                if (index > 0) {
                    mapContext.drawImage(this.images[tileset.imageName],
                        tileset.getSourceX(index), tileset.getSourceY(index),
                        mapData.tilewidth, mapData.tileheight,
                        col * mapData.tilewidth, row * mapData.tileheight,
                        mapData.tilewidth, mapData.tileheight
                    );
                }
                col++;
                if (col > (mapData.width - 1)) {
                    col = 0;
                    row++;
                }
            });
        }
        if (layer.type == "objectgroup") {
            hitboxes.push(...layer.objects.map(obj => ({
                x1: obj.x,
                x2: obj.x + obj.width,
                y1: obj.y,
                y2: obj.y + obj.height
            })));
        }
    });

    this.images[name] = mapImage;
    return new LevelMap({
        imageName: name,
        sourceX: 0,
        sourceY: 0,
        width: mapImage.width,
        height: mapImage.height,
        hitboxes: hitboxes
    });
};