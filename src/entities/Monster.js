import k from "../kaboom";
import { getPlayer } from "./Player";
import Projectile from "./Projectile";

class Monster {
  constructor(posX, posY) {
    const monster = k.add([
      k.pos(posX, posY),
      k.sprite("monster"),
      k.origin("center"),
      k.opacity(0),
      k.area(),
      "monster",
      {
        lastShot: 2,
        numberOfShots: 3,
        movedPx: 0,
        moveDirection: "down",
        update() {
          if (this.numberOfShots > 0 && this.opacity <= 1) {
            this.opacity += k.dt();
          }
          if (this.numberOfShots === 0) {
            if (this.opacity >= 0) {
              this.opacity -= k.dt();
            } else {
              k.destroy(this);
            }
          }

          this.lastShot -= k.dt();
          if (this.lastShot <= 0 && this.numberOfShots > 0) {
            this.lastShot = 5;
            this.shoot();
          }

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
          this.numberOfShots -= 1;
          this.play("blink");
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

    monster.onAnimEnd("blink", () => {
      monster.frame = 0;
    });
  }
}

export default Monster;
