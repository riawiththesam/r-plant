import { ColorMatrixFilter, Container, type Filter } from "pixi.js";
import { NineSliceWithText } from "../../../nine-slice-with-text/nine-slice-with-text";
import { type FriendCommandState } from "../../../../scene/battle-scene/types/friend-list-state";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unselectedFilter = createUnselectedFilter();

const textHeight = 60;

export class CharacterLayer extends Container {
  update(state?: FriendCommandState): void {
    this.removeChildren();

    const text = new NineSliceWithText({
      text: "キャラクター1",
      x: 0,
      y: 0,
      width: 300,
      height: textHeight,
    });
    this.addChild(text);

    const commandList = state?.command.commandList ?? [];
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

function createUnselectedFilter(): Filter {
  const filter = new ColorMatrixFilter();
  filter.brightness(0.7, true);
  return filter;
}
