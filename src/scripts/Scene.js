export function Scene(game) {
    this.game = game;
    this.status = Scene.working();
}

Scene.prototype = {};

Scene.working = function () {
    return "WORKING";
};
Scene.loaded = function () {
    return "LOADED";
};
Scene.start_game = function () {
    return "START_GAME";
};
Scene.game_over = function () {
    return "GAME_OVER";
};
Scene.game_win = function () {
    return "GAME_WIN";
};
Scene.finished = function () {
    return "FINISHED";
};

Scene.prototype.finish = function (status) {
    this.status = status;
};

Scene.prototype.init = function () {
    this.status = Scene.working();
};

Scene.prototype.render = function (time) {

};

