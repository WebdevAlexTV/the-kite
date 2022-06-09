import k from "../kaboom";

class Cloud {
  constructor(posX, posY, direction = "left", cloudFrame = 0, cloudSpeed = 20) {
    this.cloud = k.add([
      k.pos(posX, posY),
      k.origin("center"),
      k.sprite("cloud", { frame: cloudFrame }),
      k.opacity(0.8),
      {
        direction,
        update() {
          this.pos.x =
            this.pos.x + (direction === "left" ? -1 : 1) * k.dt() * cloudSpeed;
          this.pos.y += k.dt() * 10;

          if (this.pos.x < -40) {
            this.pos.x = k.width() + 39;
          } else if (this.pos.x > k.width() + 40) {
            this.pos.x = -39;
          }
          if (this.pos.y > k.height() + 40) {
            this.pos.y = -40;
          }
        },
      },
    ]);
  }
}

export default Cloud;
