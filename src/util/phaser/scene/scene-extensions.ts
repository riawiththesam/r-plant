import { fitImageToCanvas } from "../image/image-extensions";

export function setSceneBackgroundImage(scene: Phaser.Scene, texture: string) {
  const canvas = scene.sys.canvas;
  const backgorundImage = scene.add.image(canvas.width / 2, canvas.height / 2, texture);
  fitImageToCanvas(backgorundImage, scene);
}
