import { Container } from "pixi.js";
import { BattleEnemy } from "./battle-enemy";
import { type Observable, type Subscription } from "rxjs";
import { letSubscription } from "../../../../util/rxjs/subscription/subscriptions";
import { type BattleSceneState } from "../../../../scene/battle-scene/types/battle-scene-state/battle-scene-state";
import { getDamageMotionFrame } from "../../../../scene/battle-scene/types/battle-phase-state/execute-actions-state/execute-actions-state";
import { isTargetOfCommandEffect } from "../../../../scene/battle-scene/types/battle-phase-state/command-effect/command-effect";

export class BattleEnemyLayer extends Container {
  subscribe(battleSceneObservable: Observable<BattleSceneState>): Subscription {
    return letSubscription((it) => {
      battleSceneObservable
        .subscribe((state) => {
          this.removeChildren();

          const phase = state.phaseState;
          const selectedEnemyIndexes = phase.type === "selectTarget" ? phase.selectedEnemyTargetIndexes : [];
          const damageMotionStartFrame = phase.type === "executeActions" ? getDamageMotionFrame(phase) : 0;

          this.safeAddChildren(
            state.enemyListState.list.map((item, enemyIndex) => {
              const effectList = phase.type === "executeActions" ? phase.commandResult : [];
              const isEffectTarget = isTargetOfCommandEffect(effectList, "enemy", enemyIndex);

              return new BattleEnemy(
                item,
                selectedEnemyIndexes.some((i) => i === enemyIndex),
                isEffectTarget ? damageMotionStartFrame : 0,
              );
            }),
          );
        })
        .addTo(it);
    });
  }
}
