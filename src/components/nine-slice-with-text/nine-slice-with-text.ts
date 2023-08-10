import { Container, NineSlicePlane, Text, Texture } from "pixi.js";
import windowImage from "../../game-assets/ui/window/window-black.png";

export type NineSliceWithTextProps = {
  text: string;
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
    const { text, x, y, width, height } = props;

    const windowObject = new NineSlicePlane(
      Texture.from(windowImage),
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
