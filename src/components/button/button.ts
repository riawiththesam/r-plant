import * as PIXI from "pixi.js";

export type ButtonProps = {
  x: number;
  y: number;
  text: string;
  width: number;
  height: number;
  onClick: () => void;
};

const defaultStyle: Partial<PIXI.TextStyle> = {
  align: "center",
  fontSize: 15,
  fill: "black",
};

export class Button extends PIXI.Container {
  private rect: PIXI.Graphics;
  private text: PIXI.Text;

  constructor(props: ButtonProps) {
    super();
    const { x, y, text, width, height, onClick } = props;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.rect = new PIXI.Graphics();
    this.addChild(this.rect);
    this.rect.beginFill(0xffffff);
    this.rect.lineStyle(5, 0xff0000);
    this.rect.drawRect(0, 0, width, height);

    this.text = new PIXI.Text(text, defaultStyle);
    this.rect.addChild(this.text);

    this.rect.eventMode = "dynamic";
    this.rect.on("pointerover", () => {
      this.text.style = { ...defaultStyle, fill: "white" };
    });
    this.rect.on("pointerout", () => {
      this.text.style = { ...defaultStyle, fill: "black" };
    });
    this.rect.on("pointerup", () => {
      onClick && onClick();
    });
  }
}
