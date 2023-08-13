import { Container } from "pixi.js";
import { BattleEnemy } from "./battle-enemy";
import { type BattleSceneState } from "../../../../scene/battle-scene/battle-scene-subject";
import { type Observable, type Subscription } from "rxjs";
import { letSubscription } from "../../../../util/rxjs/subscription/subscriptions";

export class BattleEnemyLayer extends Container {
  subscribe(battleSceneObservable: Observable<BattleSceneState>): Subscription {
    return letSubscription((it) => {
      battleSceneObservable
        .subscribe((state) => {
          this.removeChildren();

          const phase = state.phaseState;
          const selectedEnemyIndexes = phase.phase === "selectTarget" ? phase.selectedEnemyTargetIndexes : [];

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
