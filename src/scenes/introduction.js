import MenuKite from "../entities/MenuKite";
import k from "../kaboom";
import { createButton, initButtons } from "../ui";

const introduction = (previousScene) => {
  k.layers(["obj", "ui"], "obj");

  initButtons();

  k.add([
    k.text("Introduction", { size: 24 }),
    k.pos(k.width() / 2, 50),
    k.origin("center"),
  ]);

  const lines = [
    "Your kite is flying through the air.",
    "Try to keep him save. Don't collide with something else!",
    "",
    "",
    "Good Luck!",
  ];

  const startAt = 100;
  for (let i = 0; i < lines.length; i++) {
    k.add([
      k.text(lines[i], { size: 12 }),
      k.pos(50, startAt + i * 14),
      k.origin("left"),
    ]);
  }

  createButton(k.width() / 2, k.height() - 50, "Start", () => {
    k.go("game");
  });

  const menuKite = new MenuKite();

  k.onUpdate(() => {
    menuKite.onUpdate();
  });

  k.onDraw(() => {
    menuKite.onDraw();
  });
};

export default introduction;
