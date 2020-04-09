export function Control() {
    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;
    this.fire = false;
    this.pause = false;
    this.keyMap = new Map([
        [37, 'left'], [39, 'right'], [38, 'up'], [40, 'down'], [32, 'fire'], [13, 'enter'],[27, 'pause']
    ]);
    document.addEventListener('keydown', (event) => this.update(event, true));
    document.addEventListener('keyup', (event) => this.update(event, false));
}

Control.prototype.update = function (event, pressed) {
    if (this.keyMap.has(event.keyCode)) {
        event.preventDefault();
        event.stopPropagation();
        this[this.keyMap.get(event.keyCode)] = pressed;
    }
};