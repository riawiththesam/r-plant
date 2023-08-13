import { Container } from "pixi.js";
import { BattleEnemy } from "./battle-enemy";
import { type BattleSceneState } from "../../../../scene/battle-scene/battle-scene-subject";
import { type Observable, Subscription } from "rxjs";

export class BattleEnemyLayer extends Container {
  subscribe(battleSceneObservable: Observable<BattleSceneState>): Subscription {
    const subscription = new Subscription();

    battleSceneObservable
      .subscribe((state) => {
        this.removeChildren();
        this.safeAddChildren(state.enemyListState.list.map((item) => new BattleEnemy(item)));
      })
      .addTo(subscription);

    return subscription;
  }
}
