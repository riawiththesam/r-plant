import { Container } from "pixi.js";
import { BattleEnemy } from "./battle-enemy";
import { type Observable, type Subscription } from "rxjs";
import { letSubscription } from "../../../../util/rxjs/subscription/subscriptions";
import { type BattleSceneState } from "../../../../scene/battle-scene/types/battle-scene-state/battle-scene-state";

export class BattleEnemyLayer extends Container {
  subscribe(battleSceneObservable: Observable<BattleSceneState>): Subscription {
    return letSubscription((it) => {
      battleSceneObservable
        .subscribe((state) => {
          this.removeChildren();

          const phase = state.phaseState;
          const selectedEnemyIndexes = phase.type === "selectTarget" ? phase.selectedEnemyTargetIndexes : [];

          this.safeAddChildren(
            state.enemyListState.list.map((item, enemyIndex) => {
              return new BattleEnemy(
                item,
                selectedEnemyIndexes.some((i) => i === enemyIndex),
              );
            }),
          );
        })
        .addTo(it);
    });
  }
}
