import { Container } from "pixi.js";
import { type FriendListState } from "../../../../scene/battle-scene/types/friend-list-state";
import { BattleFriend } from "./battle-friend";
import { gameConfig } from "../../../../common/game-config";

const spriteSize = 100;
const widthForOneFriend = gameConfig.width / 6;
const marginSide = (widthForOneFriend - spriteSize) / 2;

export class BattleFriendLayer extends Container {
  update(listState: FriendListState): void {
    this.removeChildren();
    this.safeAddChildren(
      listState.list.map((friend) => {
        const friendItem = new BattleFriend({
          x: widthForOneFriend * friend.inParty.position + marginSide,
          y: gameConfig.height - spriteSize,
          widht: spriteSize,
          height: spriteSize,
          image: friend.graphics.image,
        });
        return friendItem;
      }),
    );
  }
}
