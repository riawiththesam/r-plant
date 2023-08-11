import { Container, NineSlicePlane, Text, Texture } from "pixi.js";

export type NineSliceWithTextProps = {
  text: string;
  textureUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const windowImageSize = 120;
const windowImageSliceSize = windowImageSize / 3;

export class NineSliceWithText extends Container {
  constructor(props: NineSliceWithTextProps) {
    super();
    const { text, textureUrl, x, y, width, height } = props;

    const windowObject = new NineSlicePlane(
      Texture.from(textureUrl),
      windowImageSliceSize,
      windowImageSliceSize,
      windowImageSliceSize,
      windowImageSliceSize,
    );
    windowObject.x = x;
    windowObject.y = y;
    windowObject.width = width;
    windowObject.height = height;
    this.addChild(windowObject);

    const textObject = new Text(text, {
      fill: "white",
    });
    textObject.pivot.x = textObject.width / 2;
    textObject.pivot.y = textObject.height / 2;

    textObject.x = x + width / 2;
    textObject.y = y + height / 2;
    this.addChild(textObject);
  }
}
