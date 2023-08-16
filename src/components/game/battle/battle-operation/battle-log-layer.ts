import { Container } from "pixi.js";
import { BattleLog } from "./battle-log";
import { type Observable, type Subscription } from "rxjs";
import { letSubscription } from "../../../../util/rxjs/subscription/subscriptions";
import { type BattleSceneState } from "../../../../scene/battle-scene/types/battle-scene-state/battle-scene-state";

export class BattleLogLayer extends Container {
  subscribe(battleSceneObservable: Observable<BattleSceneState>): Subscription {
    return letSubscription((it) => {
      battleSceneObservable
        .subscribe((state) => {
          this.removeChildren();

          const phaseState = state.phaseState;
          if (phaseState.type !== "executeActions") return;

          const actor = phaseState.battleLog.actor;
          const log = phaseState.battleLog.list;
          this.addChild(new BattleLog({ actor, log }));
        })
        .addTo(it);
    });
  }
}
