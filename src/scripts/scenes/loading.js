import {Scene} from "../Scene";
import {Sound} from "../Sound";


export function Loading(game) {
    Scene.call(this, game);
    this.loadedAT = 0;
    this.sound = new Sound('../src/sound/loading.mp3');
}

Loading.prototype.init = function () {
    this.status = Scene.working();
    this.loadedAT = 0;
};

Loading.prototype = Object.create(Scene.prototype);
Loading.prototype.constructor = Loading;

Loading.prototype.render = function (time) {
    this.update(time);
    this.game.screen.fill("#000000");

    this.game.screen.print(760, 450, "ZHELTKO PRODUCTION GAME. Loading...");
};

Loading.prototype.update = function (time) {
    if (this.loadedAT === 0 && this.game.screen.isImagesLoaded === true) {
        this.loadedAT = time;
        this.sound.play();
    }
    if (this.loadedAT !== 0 && (time - this.loadedAT) > 6000) {
        this.sound.stop();
        this.finish(Scene.loaded());
    }
};




