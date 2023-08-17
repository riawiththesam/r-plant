import { Container } from "pixi.js";
import { BattleFriend } from "./battle-friend";
import { gameConfig } from "../../../../common/game-config";
import { type Observable, type Subscription } from "rxjs";
import { letSubscription } from "../../../../util/rxjs/subscription/subscriptions";
import { type FriendCharacterState } from "../../../../scene/battle-scene/types/battle-character-state/friend-list-state";
import { type BattleSceneState } from "../../../../scene/battle-scene/types/battle-scene-state/battle-scene-state";
import { getDamageMotionFrame } from "../../../../scene/battle-scene/types/battle-phase-state/execute-actions-state/execute-actions-state";
import { isTargetOfCommandEffect } from "../../../../scene/battle-scene/types/battle-phase-state/command-effect/command-effect";

const spriteSize = 100;
const widthForOneFriend = gameConfig.width / 6;
const marginSide = (widthForOneFriend - spriteSize) / 2;

export class BattleFriendLayer extends Container {
  subscribe(battleSceneStateObservable: Observable<BattleSceneState>): Subscription {
    return letSubscription((it) => {
      battleSceneStateObservable
        .subscribe((state) => {
          this.removeChildren();

          const phase = state.phaseState;
          const damageMotionStartFrame = phase.type === "executeActions" ? getDamageMotionFrame(phase) : 0;
          const effectList = phase.type === "executeActions" ? phase.commandResult : [];
          this.safeAddChildren(
            state.friendListState.list.map((friend, index) => {
              const isEffectTarget = isTargetOfCommandEffect(effectList, "friend", index);
              return new BattleFriend({
                x: getFriendPositionX(friend),
                y: getFriendPositionY(),
                width: spriteSize,
                height: spriteSize,
                friend,
                damageMotionFrame: isEffectTarget ? damageMotionStartFrame : 0,
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
