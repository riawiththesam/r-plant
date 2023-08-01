import Phaser from "phaser";
import { setSceneBackgroundImage } from "../../util/phaser/scene/scene-extensions";

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: MainScene.constructor.name });
  }

  preload() {
    this.load.image("bg-grass", "assets/background/bg-grass.png");
  }

  create() {
    setSceneBackgroundImage(this, "bg-grass");
  }
}
