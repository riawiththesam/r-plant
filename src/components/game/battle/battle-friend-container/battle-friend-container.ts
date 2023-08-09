import { Container } from "pixi.js";
import {
  friendListStateKeys,
  type FriendListState,
  type FriendListStateKey,
} from "../../../../scene/battle-scene/battle-scene-view-model";
import { BattleFriend } from "../battle-friend/battle-friend";
import { gameConfig } from "../../../../common/game-config";

const spriteSize = 100;
const widthForOneFriend = gameConfig.width / 6;
const marginSide = (widthForOneFriend - spriteSize) / 2;

export class BattleFriendContainer extends Container {
  constructor(listState: FriendListState) {
    super();

    this.safeAddChildren(
      friendListStateKeys.map((key) => {
        const params = friendListStateKeysToGraphicsParams(key);
        const friendItem = new BattleFriend({
          ...params,
          widht: spriteSize,
          height: spriteSize,
          state: listState[key],
        });
        return friendItem;
      }),
    );
  }
}

type GraphicsParams = {
  x: number;
  y: number;
};
function friendListStateKeysToGraphicsParams(key: FriendListStateKey): GraphicsParams {
  switch (key) {
    case "one": {
      return {
        x: marginSide,
        y: gameConfig.height - spriteSize,
      };
    }
    case "two": {
      return {
        x: widthForOneFriend + marginSide,
        y: gameConfig.height - spriteSize,
      };
    }
    case "three": {
      return {
        x: widthForOneFriend * 2 + marginSide,
        y: gameConfig.height - spriteSize,
      };
    }
    case "four": {
      return {
        x: widthForOneFriend * 3 + marginSide,
        y: gameConfig.height - spriteSize,
      };
    }
    case "five": {
      return {
        x: widthForOneFriend * 4 + marginSide,
        y: gameConfig.height - spriteSize,
      };
    }
    case "six": {
      return {
        x: widthForOneFriend * 5 + marginSide,
        y: gameConfig.height - spriteSize,
      };
    }
  }
}
