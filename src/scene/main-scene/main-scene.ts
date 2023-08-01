import Phaser from "phaser";
import { setSceneBackgroundImage } from "../../util/phaser/scene/scene-extensions";
import { createButton } from "../../components/button/button";

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: MainScene.constructor.name });
  }

  preload() {
    this.load.image("bg-grass", "assets/background/bg-grass.png");
  }

  create() {
    setSceneBackgroundImage(this, "bg-grass");

    createButton({
      scene: this,
      x: 200,
      y: 200,
      text: "スタート",
      width: 100,
      height: 50,
      onClick: () => {
        console.log("onClick");
      },
    });
  }
}
