import {Scene} from "../Scene";
import {SpriteFactory} from "../Sprite-Factory";
import {AnimationFactory} from "../AnimationFactory";
import {PlayerTank} from "../PlayerTank";
import {CollisionDetector} from "../CollisionDetector";
import {EnemyTank} from "../EnemyTank";
import {Bullet} from "../Bullet";
import {Sound} from "../Sound";


export function GameLevel(game) {
    Scene.call(this, game);
    this.tiles = new SpriteFactory(
        'tiles',
        640,
        640,
        64,
        64
    );
    this.player = new PlayerTank(this.game.control, "player", 200, 900, 700);
    this.enemies = [
        new EnemyTank("enemy", 50, 80, 50),
        new EnemyTank("enemy", 50, 1600, 50),
        new EnemyTank("enemy", 20, 80, 700),
        new EnemyTank("enemy", 40, 1600, 700),
        new EnemyTank("enemy", 30, 900, 80),
        new EnemyTank("enemy", 30, 900, 80)

    ];

    this.collision = new CollisionDetector();
    this.bullets = this.player.bullets;
    this.sound = new Sound('../src/sound/gamelevel .mp3');


}

GameLevel.prototype = Object.create(Scene.prototype);
GameLevel.prototype.constructor = GameLevel;

GameLevel.prototype.init = function () {
    this.status = Scene.working();
    const mapData = require('../maps/level3');
    this.map = this.game.screen.createMap("level3", mapData, this.tiles);
    this.collision.addStaticShapes(mapData);
    this.collision.addKinematicBody(this.player);
    this.enemies.forEach(enemy => {
        this.collision.addKinematicBody(enemy);
    });


};
GameLevel.prototype.update = function (time) {
    this.bullets.forEach(bullet => {
        bullet.update(time);
    });
    this.enemies.forEach(enemy => {
        enemy.update(time);
    });
    this.player.update(time);
    this.collision.update(time);
    this.enemies.forEach(enemy => {
        this.collision.bulletsHitTanks(this.player, enemy.bullets);
        this.collision.bulletsHitTanks(enemy, this.player.bullets);
        console.log(enemy.damage);
        if(enemy.damage >1000){
            enemy.active = false;
            enemy.bullets.active = false;

        }
    });

    this.collision.bulletsHitMap(this.player.bullets, time);
    this.enemies.forEach(enemy => {
        this.collision.bulletsHitMap(enemy.bullets);
    });


    this.collision.bulletOutOfScreen(this.player.bullets);
    if (this.game.control.pause) {
        this.sound.stop();
        this.finish(Scene.loaded());
    }
    if (this.player.damage > 10000){
        this.finish(Scene.game_over());
    }


};

GameLevel.prototype.render = function (time) {
    this.sound.play();
    this.update(time);

    this.game.screen.drawSprite(this.map);
    this.game.screen.print(800,800,"DAMAGE: 10000/");
    this.game.screen.print(1000,800,this.player.damage);
    this.game.screen.drawSprite(this.player.view);
    this.enemies.forEach(enemy => {
        if (enemy.active) {
            this.game.screen.drawSprite(enemy.view);
            enemy.bullets.forEach(bullet => {
                if (bullet.active) {
                    this.game.screen.drawSprite(bullet.view);
                }
            });
        }

    });
    this.bullets.forEach(bullet => {
        if (bullet.active) {
            this.game.screen.drawSprite(bullet.view);
        }
    });


};

