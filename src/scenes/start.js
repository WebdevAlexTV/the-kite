import k from "../kaboom";

const start = () => {
  k.layers(["obj", "ui"], "obj");

  const logo = k.add([
    k.sprite("theKite"),
    k.pos(k.width() / 2, k.height() + 60),
    k.origin("center"),
  ]);

  k.onUpdate(() => {
    if (logo.pos.y > 100) {
      logo.pos.y -= 150 * k.dt();
    } else {
      k.go("title");
    }
  });
};

export default start;
