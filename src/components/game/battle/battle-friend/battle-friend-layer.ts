import { Container } from "pixi.js";
import { BattleFriend } from "./battle-friend";
import { gameConfig } from "../../../../common/game-config";
import { type BattleSceneState } from "../../../../scene/battle-scene/battle-scene-subject";
import { type Observable, type Subscription } from "rxjs";
import { letSubscription } from "../../../../util/rxjs/subscription/subscriptions";

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
                x: widthForOneFriend * friend.inParty.position + marginSide,
                y: gameConfig.height - spriteSize,
                widht: spriteSize,
                height: spriteSize,
                image: friend.graphics.image,
              });
            }),
          );
        })
        .addTo(it);
    });
  }
}
