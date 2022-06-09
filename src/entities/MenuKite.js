import k from "../kaboom";

class MenuKite {
  constructor() {
    this.finalPos = (k.height() / 3) * 2;
    this.kite = k.add([
      k.pos((k.width() / 4) * 3, k.height() + 100),
      k.scale(1),
      k.opacity(1),
      k.origin("center"),
      k.sprite("kite"),
      k.layer("ui"),
      {
        shrink: true,
        atFinalPos: false,
      },
    ]);

    this.kite.play("fly");
  }

  onUpdate() {
    if (!this.kite.atFinalPos) {
      this.kite.pos.y -= 200 * k.dt();
      this.kite.pos.x += 10 * k.dt();
    }

    if (this.kite.pos.y <= this.finalPos) {
      this.kite.atFinalPos = true;
    }

    if (this.kite.atFinalPos) {
      if (this.kite.scale.x <= 0.9) {
        this.kite.scale.x = 0.9;
        this.kite.scale.y = 0.9;
        this.kite.shrink = false;
      }
      if (this.kite.scale.x >= 1) {
        this.kite.scale.x = 1;
        this.kite.scale.y = 1;
        this.kite.shrink = true;
      }
      if (this.kite.shrink) {
        this.kite.scale.x -= 0.1 * k.dt();
        this.kite.scale.y -= 0.1 * k.dt();
      } else {
        this.kite.scale.x += 0.1 * k.dt();
        this.kite.scale.y += 0.1 * k.dt();
      }
    }
  }

  onDraw() {
    k.drawLine({
      p1: k.vec2(this.kite.pos.x, this.kite.pos.y + 20),
      p2: k.vec2(k.width() / 2, k.height() * 2),
      width: 1,
      color: k.rgb(0, 0, 0),
    });
  }
}

export default MenuKite;
