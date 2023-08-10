import { Container } from "pixi.js";
import { NineSliceWithText } from "../../../nine-slice-with-text/nine-slice-with-text";

export class CharacterName extends Container {
  constructor() {
    super();
    const text = new NineSliceWithText({
      text: "キャラクター1",
      x: 0,
      y: 0,
      width: 300,
      height: 60,
    });
    this.addChild(text);
  }
}
