import { Container } from "pixi.js";
import { BattleFriend } from "./battle-friend";
import { gameConfig } from "../../../../common/game-config";
import { type BattleSceneState } from "../../../../scene/battle-scene/battle-scene-subject";
import { type Observable, type Subscription } from "rxjs";
import { letSubscription } from "../../../../util/rxjs/subscription/subscriptions";
import { type FriendCharacterState } from "../../../../scene/battle-scene/types/friend-list-state";

const spriteSize = 100;
const widthForOneFriend = gameConfig.width / 6;
const marginSide = (widthForOneFriend - spriteSize) / 2;

export class BattleFriendLayer extends Container {
  subscribe(battleSceneStateObservable: Observable<BattleSceneState>): Subscription {
    return letSubscription((it) => {
      battleSceneStateObservable
        .subscribe((state) => {
          this.removeChildren();
          this.safeAddChildren(
            state.friendListState.list.map((friend) => {
              return new BattleFriend({
                x: getFriendPositionX(friend),
                y: getFriendPositionY(),
                width: spriteSize,
                height: spriteSize,
                friend,
              });
            }),
          );
        })
        .addTo(it);
    });
  }
}

export function getFriendPositionX(friend: FriendCharacterState): number {
  return widthForOneFriend * friend.inParty.position + marginSide + spriteSize / 2;
}

export function getFriendPositionY(): number {
  return gameConfig.height - spriteSize + spriteSize / 2;
}
