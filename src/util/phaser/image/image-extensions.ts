export function fitImageToCanvas(image: Phaser.GameObjects.Image, scene: Phaser.Scene) {
  const canvas = scene.sys.canvas;

  const scaleX = canvas.width / image.width;
  const scaleY = canvas.height / image.height;
  image.setScale(scaleX, scaleY);
}
