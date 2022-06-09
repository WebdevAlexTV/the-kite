import { AudioManager } from "../audio";
import k from "../kaboom";
import { getPlayer } from "./Player";
import Projectile from "./Projectile";

class Drone {
  constructor(posX, posY = -40) {
    const audioManager = new AudioManager();

    const drone = k.add([
      k.pos(posX, posY),
      k.sprite("drone"),
      k.origin("center"),
      k.scale(1.5),
      k.area(),
      "drone",
      {
        finalPlace: false,
        lastShot: 2,
        numberOfShots: 3,
        movedPx: 0,
        moveDirection: "down",
        droneSound: undefined,
        player: getPlayer(),
        update() {
          if (this.player && this.player.dead && this.droneSound) {
            this.droneSound.stop();
          }
          if (!this.finalPlace && this.pos.y < 50) {
            this.pos.y += 100 * k.dt();
          }
          if (!this.finalPlace && this.pos.y > 50) {
            this.finalPlace = true;
          }

          if (this.finalPlace && this.numberOfShots > 0) {
            this.flyStill();
          }

          if (this.finalPlace && this.numberOfShots === 0) {
            this.pos.y -= 100 * k.dt();
            if (this.pos.y < -50) {
              this.droneSound.stop();
              k.destroy(this);
            }
          }

          this.lastShot -= k.dt();
          if (this.lastShot <= 0 && this.numberOfShots > 0) {
            this.lastShot = 5;
            this.shoot();
          }
        },
        flyStill() {
          if (this.moveDirection === "down") {
            this.pos.y += k.dt() * 10;
          } else {
            this.pos.y -= k.dt() * 10;
          }
          this.movedPx += k.dt() * 10;
          if (this.movedPx > 8) {
            this.movedPx = 0;
            this.moveDirection = this.moveDirection === "up" ? "down" : "up";
          }
        },
        shoot() {
          this.numberOfShots--;
          const player = getPlayer();
          if (player) {
            const angle = Math.atan2(
              player.pos.y - this.pos.y,
              player.pos.x - this.pos.x
            );

            new Projectile(this.pos, angle * (180 / Math.PI) + 90);
          }
        },
      },
    ]);

    drone.play("fly", { loop: true });
    drone.droneSound = audioManager.play("drone", {
      loop: true,
      volume: 0.2,
      speed: 3,
    });
  }
}

export default Drone;
