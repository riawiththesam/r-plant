import { ColorMatrixFilter, Container } from "pixi.js";
import { NineSliceWithText } from "../../../nine-slice-with-text/nine-slice-with-text";

const unselectedFilter = createUnselectedFilter();

const commandList: Array<[string, string]> = [
  ["attack", "攻撃"],
  ["spell", "呪文"],
  ["skill", "スキル"],
  ["item", "アイテム"],
];

const textHeight = 60;

export class CharacterLayer extends Container {
  update() {
    this.removeChildren();

    const text = new NineSliceWithText({
      text: "キャラクター1",
      x: 0,
      y: 0,
      width: 300,
      height: textHeight,
    });
    this.addChild(text);

    const commandObjectList = commandList.map(([_, commandText], index) => {
      return new NineSliceWithText({
        text: commandText,
        x: 0,
        y: textHeight + textHeight * index,
        width: 280,
        height: textHeight,
      });
    });
    this.safeAddChildren(commandObjectList);
  }
}

function createUnselectedFilter() {
  const filter = new ColorMatrixFilter();
  filter.brightness(0.7, true);
  return filter;
}
