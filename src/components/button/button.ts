export type ButtonProps = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  text: string;
  width: number;
  height: number;
  fontSize?: number;
  color?: string;
  onClick: () => void;
};

export class Button extends Phaser.GameObjects.Container {
  private rect: Phaser.GameObjects.Rectangle;
  private text: Phaser.GameObjects.Text;

  constructor(props: ButtonProps) {
    const { scene, x, y, text, width, height, fontSize = 15, color = "black", onClick } = props;
    super(scene, x, y);

    this.scene = scene;
    this.scene.add.existing(this);
    this.setSize(width, height);

    this.text = scene.add.text(0, 0, text, { align: "center", fontSize, color }).setOrigin(0.5, 0.5);
    this.text.setColor("black");

    this.rect = scene.add.rectangle(0, 0, width, height).setInteractive();
    this.rect.setStrokeStyle(1, 0xffffff).setOrigin(0.5, 0.5);

    this.rect.on("pointerover", () => {
      this.text.setColor("white");
    });
    this.rect.on("pointerout", () => {
      this.text.setColor("black");
    });
    this.rect.on("pointerup", () => {
      onClick && onClick();
    });
    this.add([this.rect, this.text]);
  }
}

export function createButton(props: ButtonProps) {
  return new Button(props);
}
