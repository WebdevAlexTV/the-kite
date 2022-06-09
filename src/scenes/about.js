import { AudioManager } from "../audio";
import MenuKite from "../entities/MenuKite";
import k from "../kaboom";
import { createButton, initButtons } from "../ui";

const about = (previousScene) => {
  const audioManager = new AudioManager();

  k.layers(["obj", "ui"], "obj");

  initButtons();

  const sounds = [
    "50 CC0 Sci-Fi SFX by rubberduck",
    "4 Chiptunes (Adventure) by SubspaceAudio",
    "Time Slow by MidFag",
  ];

  k.add([
    k.text("About", { size: 24 }),
    k.pos(k.width() / 2, 50),
    k.origin("center"),
  ]);

  k.add([
    k.text("Idea, Programming and Art by Webdevalex", { size: 20 }),
    k.origin("center"),
    k.pos(k.width() / 2, 150),
  ]);

  k.add([
    k.text("Sounds used from opengameart", { size: 20 }),
    k.pos(k.width() / 2, 250),
    k.origin("center"),
  ]);

  const startAt = 280;
  for (let i = 0; i < sounds.length; i++) {
    k.add([
      k.text(sounds[i], { size: 12 }),
      k.pos(k.width() / 2, startAt + i * 14),
      k.origin("center"),
    ]);
  }

  createButton(k.width() / 2, k.height() - 50, "Back", () => {
    k.go(previousScene);
  });

  const menuKite = new MenuKite();

  k.onUpdate(() => {
    menuKite.onUpdate();
  });

  k.onDraw(() => {
    menuKite.onDraw();
  });
};

export default about;
