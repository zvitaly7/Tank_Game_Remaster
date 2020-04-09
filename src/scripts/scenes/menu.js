import {Scene} from "../Scene";
import {Sound} from "../Sound";


export function Menu(game) {
    Scene.call(this, game);
    this.sound = new Sound('../src/sound/menu.mp3');
}

Menu.prototype = Object.create(Scene.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.init = function () {


};
Menu.prototype = Object.create(Scene.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function (time) {
    this.update(time);
    this.game.screen.drawImage(0, 0, "start");
    this.game.screen.drawImage(550, 100, "logo");
    this.game.screen.drawImage(750, 450, "enter");


};

Menu.prototype.update = function (time) {
    this.sound.play();
    if (this.game.control.enter) {
        this.sound.stop();
        this.finish(Scene.start_game());
    }

};
