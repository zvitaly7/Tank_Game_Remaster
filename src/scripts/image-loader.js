export function ImageLoader(imageFiles) {
    this.imageFiles = imageFiles;
    this.images = {};

}

ImageLoader.prototype.load = function () {
    const promises = [];
    for (let name in this.imageFiles) {
        promises.push(this.loadImage(name, this.imageFiles[name]));
    }
    return Promise.all(promises);

};

ImageLoader.prototype.loadImage = function (name, src) {
    return new Promise((resolve) => {
        const image = new Image();
        this.images[name] = image;
        image.onload = () => resolve(name);
        image.src = src;
    });
};