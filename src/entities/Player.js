import constants from "../constants";
import k from "../kaboom";

class Player {
  constructor() {
    this.gameObject = k.add([
      k.pos(k.width() / 2, k.height() - 48),
      k.area({ width: 20, height: 64 }),
      k.origin("center"),
      k.opacity(1),
      "player",
      {
        dead: false,
        die: () => {
          if (!this.gameObject.dead) {
            this.gameObject.dead = true;
            this.gameObject.opacity = 0;
            this.kite.opacity = 0;

            k.add([
              k.sprite("kite"),
              k.pos(this.gameObject.pos),
              k.rotate(0),
              k.scale(1),
              k.origin("center"),
              {
                update() {
                  if (this.scale.x - 0.3 * k.dt() > 0) {
                    this.scale.x -= 0.3 * k.dt();
                    this.scale.y -= 0.3 * k.dt();
                  }
                  this.angle += 250 * k.dt();
                },
              },
            ]);
          }
        },
      },
    ]);

    this.kite = k.add([
      k.pos(k.width() / 2, k.height() - 48),
      k.scale(1),
      k.opacity(1),
      k.origin("center"),
      k.sprite("kite"),
      k.follow(this.gameObject),
      k.layer("ui"),
    ]);

    this.shrink = true;

    this.kite.play("fly", { loop: true });

    this.handleInput();
  }

  handleInput() {
    k.onKeyPress("space", () => {});

    k.onKeyDown("up", () => {
      if (this.gameObject.pos.y - k.dt() * constants.movementSpeed > 48) {
        this.gameObject.pos.y -= k.dt() * constants.movementSpeed;
      } else {
        this.gameObject.pos.y = 48;
      }
    });

    k.onKeyDown("down", () => {
      if (
        this.gameObject.pos.y + k.dt() * constants.movementSpeed <
        k.height() - 48
      ) {
        this.gameObject.pos.y += k.dt() * constants.movementSpeed;
      } else {
        this.gameObject.pos.y = k.height() - 48;
      }
    });

    k.onKeyDown("left", () => {
      if (this.gameObject.pos.x - k.dt() * constants.movementSpeed > 32) {
        this.gameObject.pos.x -= k.dt() * constants.movementSpeed;
      } else {
        this.gameObject.pos.x = 32;
      }
    });

    k.onKeyDown("right", () => {
      if (this.dead) {
        return;
      }
      if (
        this.gameObject.pos.x + k.dt() * constants.movementSpeed <
        k.width() - 32
      ) {
        this.gameObject.pos.x += k.dt() * constants.movementSpeed;
      } else {
        this.gameObject.pos.x = k.width() - 32;
      }
    });
  }

  onUpdate() {
    if (this.kite.scale.x <= 0.9) {
      this.kite.scale.x = 0.9;
      this.kite.scale.y = 0.9;
      this.shrink = false;
    }
    if (this.kite.scale.x >= 1) {
      this.kite.scale.x = 1;
      this.kite.scale.y = 1;
      this.shrink = true;
    }
    if (this.shrink) {
      this.kite.scale.x -= 0.1 * k.dt();
      this.kite.scale.y -= 0.1 * k.dt();
    } else {
      this.kite.scale.x += 0.1 * k.dt();
      this.kite.scale.y += 0.1 * k.dt();
    }
  }
}

export const getPlayer = () => {
  return k.get("player")[0];
};

export default Player;
