import {Screen} from "./Screen";
import {Loading} from "./scenes/loading";
import {Menu} from "./scenes/menu";
import {Scene} from "./Scene";
import {Control} from "./Control";
import {GameLevel} from "./scenes/game-level";
import {anim} from "./Animation";
import {GameOver} from "./scenes/game-over";

export const Game = function ({width = 1856, height = 832} = {}) {
    this.screen = new Screen(width, height);
    this.screen.loadImages({
        player: '../src/img/Playersprites2.png',
        enemy: '../src/img/enemySprite.png',
        tiles: '../src/img/tiles.png',
        start: '../src/img/menu.png',
        logo: '../src/img/logo.png',
        bullets: '../src/img/bulletssprite.png',
        explosion: '../src/img/bomb-sprite.png',
        enter: '../src/img/Enter-Key.png'
    });


    this.control = new Control();
    this.scenes = {
        loading: new Loading(this),
        menu: new Menu(this),
        gameLevel: new GameLevel(this),
        gameOver: new GameOver(this)
    };
    this.currentScene = this.scenes.loading;
    this.currentScene.init();

};

Game.prototype.changeScene = function (status) {
    switch (status) {
        case Scene.loaded():
            return this.scenes.menu;
        case Scene.start_game():
            return this.scenes.gameLevel;
        case Scene.game_over():
            return this.scenes.gameOver;

        default:
            return this.scenes.menu;

    }
};

Game.prototype.frame = function (time) {
    if (this.currentScene.status !== Scene.working()) {
        this.currentScene = this.changeScene(this.currentScene.status);
        this.currentScene.init();
    }
    this.currentScene.render(time);
    requestAnimationFrame(time => this.frame(time));
};

Game.prototype.run = function () {
    requestAnimationFrame(time => this.frame(time));

};