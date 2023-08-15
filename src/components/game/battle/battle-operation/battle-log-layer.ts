import { Container } from "pixi.js";
import { BattleLog } from "./battle-log";
import { type BattleSceneState } from "../../../../scene/battle-scene/battle-scene-subject";
import { type Observable, type Subscription } from "rxjs";
import { letSubscription } from "../../../../util/rxjs/subscription/subscriptions";

export class BattleLogLayer extends Container {
  subscribe(battleSceneObservable: Observable<BattleSceneState>): Subscription {
    return letSubscription((it) => {
      battleSceneObservable
        .subscribe((state) => {
          this.removeChildren();

          const phaseState = state.phaseState;
          if (phaseState.type !== "executeActions") return;

          const log = phaseState.battleLogList;
          this.addChild(new BattleLog({ log }));
        })
        .addTo(it);
    });
  }
}
