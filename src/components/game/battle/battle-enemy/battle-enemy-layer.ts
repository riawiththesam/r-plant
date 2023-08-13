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
          this.safeAddChildren(state.enemyListState.list.map((item) => new BattleEnemy(item)));
        })
        .addTo(it);
    });
  }
}
