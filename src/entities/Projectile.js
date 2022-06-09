import { AudioManager } from "../audio";
import k from "../kaboom";

class Projectile {
  constructor(position, rotation) {
    const projectile = k.add([
      k.rect(4, 4),
      k.area(),
      k.pos(position),
      k.origin("center"),
      k.color(0, 0, 0),
      k.move(k.Vec2.fromAngle(rotation - 90).scale(20), 300),
      k.rotate(rotation),
      "projectile",
      {
        update: function () {
          if (
            projectile.pos.x < -50 ||
            projectile.pos.x > k.width() + 50 ||
            projectile.pos.y < -50 ||
            projectile.pos.y > k.height() + 50
          ) {
            k.destroy(projectile);
          }
        },
      },
    ]);
    const audioManager = new AudioManager();
    audioManager.play("shoot");
  }
}

export default Projectile;
