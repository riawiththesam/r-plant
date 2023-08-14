import { Container } from "pixi.js";
import { type Observable, type Subscription } from "rxjs";
import { type BattleSceneState } from "../../../../scene/battle-scene/battle-scene-subject";
import { letSubscription } from "../../../../util/rxjs/subscription/subscriptions";
import { BattleEffect } from "./battle-effect";
import { getFriendPositionX, getFriendPositionY } from "../battle-friend/battle-friend-layer";

export class BattleEffectLayer extends Container {
  private readonly battleEffect: BattleEffect;

  constructor() {
    super();
    this.battleEffect = new BattleEffect();
    this.addChild(this.battleEffect);
  }

  subscribe(battleStateObservable: Observable<BattleSceneState>): Subscription {
    return letSubscription((it) => {
      battleStateObservable
        .subscribe((state) => {
          const phase = state.phaseState;
          this.battleEffect.visible = phase.type === "executeActions";
          if (phase.type !== "executeActions") return;

          const command = phase.allCharacterCommandList[phase.executingIndex];
          if (phase.commandEffectCurrentFrame !== 0 || command == null) return;

          const targetIndex = command.targetList[0];
          if (targetIndex == null) return;
          // TODO コマンド実行者actorTypeではなくコマンドの対象等で分岐する
          if (command.actorType === "friend") {
            // TODO 対象の数だけ表示などする
            const target = state.enemyListState.list[targetIndex];
            if (target == null) return;
            this.battleEffect.startAnimation(target.graphics.x, target.graphics.y);
          } else {
            const target = state.friendListState.list[targetIndex];
            if (target == null) return;
            this.battleEffect.startAnimation(getFriendPositionX(target), getFriendPositionY());
          }
        })
        .addTo(it);
    });
  }
}
