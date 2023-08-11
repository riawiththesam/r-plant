import { Container } from "pixi.js";
import { NineSliceWithText } from "../../../nine-slice-with-text/nine-slice-with-text";
import { type FriendCommandState } from "../../../../scene/battle-scene/types/friend-list-state";
import windowBlack from "../../../../game-assets/ui/window/window-black.png";
import windowRed from "../../../../game-assets/ui/window/window-red.png";

const textHeight = 60;

export class CharacterLayer extends Container {
  update(state?: FriendCommandState): void {
    this.removeChildren();

    const text = new NineSliceWithText({
      text: "キャラクター1",
      textureUrl: windowBlack,
      x: 0,
      y: 0,
      width: 300,
      height: textHeight,
    });
    this.addChild(text);

    const commandList = state?.command.commandList ?? [];
    const selectedIndex = state?.command.selectedCommandIndex ?? 0;
    const commandObjectList = commandList.map(([_, commandText], index) => {
      const commandObject = new NineSliceWithText({
        text: commandText,
        textureUrl: index !== selectedIndex ? windowBlack : windowRed,
        x: 0,
        y: textHeight + textHeight * index,
        width: 280,
        height: textHeight,
      });
      return commandObject;
    });
    this.safeAddChildren(commandObjectList);
  }
}
