import constants from "./constants";
import k from "./kaboom";

const loadAudio = () => {
  k.loadRoot("./resources/audio/");

  k.loadSound("drone", "drone.ogg");
  k.loadSound("shoot", "shoot.ogg");
  k.loadSound("button", "button.ogg");
  k.loadSound("music", "music.ogg");
  k.loadSound("gameOver", "gameOver.mp3");
};

export class AudioManager {
  play(audioName, options) {
    return k.play(audioName, {
      volume: constants.audioVolume,
      ...options,
    });
  }
}

export default loadAudio;
