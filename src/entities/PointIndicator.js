import k from "../kaboom";

class PointIndicator {
  constructor() {
    this.points = k.add([
      k.text("Score: 0", { size: 12 }),
      k.pos(60, k.height() - 20),
      k.origin("center"),
    ]);
  }

  onUpdate(points) {
    this.points.text = `Score: ${points}`;
  }
}

export default PointIndicator;
