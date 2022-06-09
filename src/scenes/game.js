import { AudioManager } from "../audio";
import constants from "../constants";
import Bird from "../entities/Bird";
import Cloud from "../entities/Cloud";
import Drone from "../entities/Drone";
import Player from "../entities/Player";
import PointIndicator from "../entities/PointIndicator";
import k from "../kaboom";
import level from "../level";

const game = () => {
  const audioManager = new AudioManager();
  let spawnTime = 2;
  const spawnTimeReduceStep = 0.2;
  const minSpawnTime = 0.1;
  let lastSpawn = spawnTime;
  let points = 0;

  const mainMusic = audioManager.play("music", { volume: 0.3, loop: true });

  const gameOver = () => {
    mainMusic.stop();
    const gameOverSound = audioManager.play("gameOver");
    k.wait(5, () => {
      gameOverSound.stop();
      k.go("gameOver", points);
    });
  };

  k.layers(["bg", "world", "game", "ui"], "game");

  // Build the level
  k.addLevel(level, {
    width: constants.tileSize,
    height: constants.tileSize,
    pos: k.vec2(0, 0),
    // " ": () => [k.layer("bg"), k.sprite("world", { frame: 72 })],
  });

  const background = k.add([
    k.rect(k.width(), k.height()),
    k.pos(0, 0),
    k.color(153, 204, 255),
    k.layer("bg"),
  ]);

  const birdKiller = k.add([
    k.pos(0, k.height() + 20),
    k.area({ width: k.width(), height: 10 }),
    "bird_killer",
  ]);

  const player = new Player();
  const pointIndicator = new PointIndicator();
  new Cloud(10, k.height() / 3, "right", 0, 20);
  new Cloud(80, (k.height() / 3) * 2, "right", 1, 25);
  new Cloud((k.width() / 3) * 2, k.height() / 5, "right", 2, 23);

  k.onCollide("player", "enemy", (player, enemy) => {
    if (!player.dead) {
      player.die();
      k.destroy(enemy);
      gameOver();
    }
  });

  k.onCollide("player", "projectile", (player, projectile) => {
    if (!player.dead) {
      player.die();
      k.destroy(projectile);
      gameOver();
    }
  });

  k.onCollide("enemy", "bird_killer", (enemy, birdKiller) => {
    if (!enemy.killed && !player.gameObject.dead) {
      enemy.killed = true;
      k.destroy(enemy);
      points++;

      if (points % 5 === 0 && spawnTime - spawnTimeReduceStep >= minSpawnTime) {
        spawnTime -= spawnTimeReduceStep;
      }

      if (
        !player.gameObject.dead &&
        points % 2 === 0 &&
        k.get("drone").length === 0
      ) {
        new Drone(50 + Math.random() * (k.width() - 100));
      }
    }
  });

  k.onDraw(() => {
    if (!player.gameObject.dead) {
      k.drawLine({
        p1: k.vec2(player.gameObject.pos.x, player.gameObject.pos.y + 20),
        p2: k.vec2(k.width() / 2, k.height() * 2),
        width: 1,
        color: k.rgb(0, 0, 0),
      });
    }
  });

  k.onUpdate(() => {
    lastSpawn -= k.dt();
    if (lastSpawn <= 0) {
      lastSpawn = spawnTime;
      new Bird(30 + Math.floor(Math.random() * (k.width() - 60)) + 30, -20);
    }

    player.onUpdate();
    pointIndicator.onUpdate(points);
  });
};
export default game;
