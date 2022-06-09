import MenuKite from "../entities/MenuKite";
import k from "../kaboom";
import { createButton, initButtons } from "../ui";

const title = () => {
  k.layers(["obj", "ui"], "obj");

  initButtons();

  // k.add([k.rect(k.width(), k.height()), k.pos(0, 0), k.color(k.rgb(0, 0, 0))]);

  k.add([k.sprite("theKite"), k.pos(k.width() / 2, 100), k.origin("center")]);

  createButton(k.width() / 2, k.height() / 2, "New Game", () => {
    k.go("introduction", "title");
  });
  createButton(k.width() / 2, k.height() / 2 + 48, "Controls", () => {
    k.go("controls", "title");
  });
  createButton(k.width() / 2, k.height() / 2 + 96, "About", () => {
    k.go("about", "title");
  });

  k.add([
    k.text("Created by WebDevAlex", { size: 12 }),
    k.origin("botright"),
    k.pos(k.width() - 2, k.height() - 2),
  ]);

  const menuKite = new MenuKite();

  k.onUpdate(() => {
    menuKite.onUpdate();
  });

  k.onDraw(() => {
    menuKite.onDraw();
  });
};

export default title;
