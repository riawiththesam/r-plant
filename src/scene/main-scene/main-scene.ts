import Phaser from "phaser";
import { createButton } from "../../components/button/button";

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image("bg-grass", "assets/background/bg-grass.png");
  }

  create() {
    //    setSceneBackgroundImage(this, "bg-grass");

    createButton({
      scene: this,
      x: 200,
      y: 200,
      text: "スタート",
      width: 100,
      height: 50,
      onClick: () => {
        console.log("onClick");
        this.scene.launch("TestScene");
      },
    });
  }
}
