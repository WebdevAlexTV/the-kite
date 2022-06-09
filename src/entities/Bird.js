import k from "../kaboom";

class Bird {
  constructor(posX, posY) {
    this.bird = k.add([
      k.sprite("bird"),
      k.pos(posX, posY),
      k.area(),
      k.origin("center"),
      k.scale(1 + Math.random() * 0.5),
      "enemy",
      {
        update() {
          this.pos.y += 150 * k.dt();
        },
      },
    ]);

    this.bird.play("fly", { speed: 10 });
  }
}

export default Bird;
