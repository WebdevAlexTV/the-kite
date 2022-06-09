import k from "./kaboom";

const loadSprites = () => {
  k.loadRoot("./resources/sprites/");

  k.loadSprite("kite", "kite.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      fly: {
        from: 0,
        to: 3,
      },
    },
  });
  k.loadSprite("bird", "bird.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
      fly: {
        from: 0,
        to: 1,
      },
    },
  });
  k.loadSprite("cloud", "clouds.png", {
    sliceX: 3,
    sliceY: 1,
  });
  k.loadSprite("monster", "monster.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      blink: {
        from: 0,
        to: 3,
      },
    },
  });
  k.loadSprite("drone", "drone.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      fly: {
        from: 0,
        to: 3,
      },
    },
  });

  k.loadSprite("theKite", "the-kite.png");
};

export default loadSprites;
