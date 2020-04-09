import {Scene} from "../Scene";
import {Sound} from "../Sound";

export function GameOver(game) {
    Scene.call(this, game);
    this.sound = new Sound('../src/sound/menu.mp3');
}

GameOver.prototype = Object.create(Scene.prototype);
GameOver.prototype.constructor = GameOver;

GameOver.prototype.init = function () {
    this.status = Scene.working();

};
GameOver.prototype = Object.create(Scene.prototype);
GameOver.prototype.constructor = GameOver;

GameOver.prototype.render = function (time) {
    this.update(time);
    this.game.screen.print(900,400,"YOU LOOSE!");
};


GameOver.prototype.update = function (time) {
    this.sound.play();
    this.finish(Scene.start_game());
};

