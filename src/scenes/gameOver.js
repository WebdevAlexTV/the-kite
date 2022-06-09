import k from "../kaboom";
import { createButton, initButtons } from "../ui";

const gameOver = (score) => {
  k.layers(["obj", "ui"], "obj");

  initButtons();

  k.add([
    k.text("Game Over!", { size: 24 }),
    k.pos(k.width() / 2, 50),
    k.origin("center"),
  ]);

  k.add([
    k.text(`Your Score: ${score}`, { size: 36 }),
    k.pos(k.width() / 2, 200),
    k.origin("center"),
  ]);

  createButton(k.width() / 2, k.height() - 50, "Main Menu", () => {
    k.go("start");
  });
};

export default gameOver;
