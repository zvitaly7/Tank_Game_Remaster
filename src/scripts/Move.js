export function Move(direction, speed) {
    this.setDirection(direction, speed);
}

Move.prototype.setDirection = function (direction, speed) {
    this.direction = direction;
    this.speed = speed;
    this.x = 0;
    this.y = 0;
    switch (direction) {
        case "up":
            this.y = -speed;
            break;

        case "down":
            this.y = speed;
            break;

        case "left":
            this.x = speed;
            break;

        case "right":
            this.x = -speed;
            break;

    }
};

Move.prototype.move = function (object , dt) {
    object.x += dt * (this.x / 1000);
    object.y += dt * (this.y / 1000);
};

Move.prototype.stand = function (object) {
    object.x = this.x+2;
    object.y = this.y+2;
};