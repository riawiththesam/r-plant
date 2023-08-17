import { Container } from "pixi.js";
import { BattleEnemy } from "./battle-enemy";
import { type Observable, type Subscription } from "rxjs";
import { letSubscription } from "../../../../util/rxjs/subscription/subscriptions";
import { type BattleSceneState } from "../../../../scene/battle-scene/types/battle-scene-state/battle-scene-state";
import { type PhaseState } from "../../../../scene/battle-scene/types/battle-phase-state/battle-phase-state";

export class BattleEnemyLayer extends Container {
  subscribe(battleSceneObservable: Observable<BattleSceneState>): Subscription {
    return letSubscription((it) => {
      battleSceneObservable
        .subscribe((state) => {
          this.removeChildren();

          const phase = state.phaseState;
          const selectedEnemyIndexes = phase.type === "selectTarget" ? phase.selectedEnemyTargetIndexes : [];
          const damageMotionStartFrame = getDamageMotionFrame(phase);

          this.safeAddChildren(
            state.enemyListState.list.map((item, enemyIndex) => {
              const effect = isEffectTarget(enemyIndex, phase);

              return new BattleEnemy(
                item,
                selectedEnemyIndexes.some((i) => i === enemyIndex),
                effect ? damageMotionStartFrame : 0,
              );
            }),
          );
        })
        .addTo(it);
    });
  }
}

function getDamageMotionFrame(phase: PhaseState): number {
  if (phase.type === "executeActions") {
    const diff = phase.commandEffectCurrentFrame - phase.commandDamageEffectStartFrame;
    return diff > 0 ? diff : 0;
  }
  return 0;
}

function isEffectTarget(enemyIndex: number, phase: PhaseState): boolean {
  if (phase.type !== "executeActions") return false;

  return phase.commandResult.some((effect) => {
    return effect.target === "enemy" && effect.targetIndex === enemyIndex;
  });
}
