import { Container } from "pixi.js";
import { CharacterLayer } from "./character-layer";
import { Subscription } from "rxjs";
import { type BattleSceneViewModel } from "../../../../scene/battle-scene/battle-scene-view-model";

export class BattleOperationLayer extends Container {
  private readonly characterLayer = new CharacterLayer();

  constructor() {
    super();

    this.addChild(this.characterLayer);
  }

  subscribe(battleSceneViewModel: BattleSceneViewModel): Subscription {
    const subscription = new Subscription();

    battleSceneViewModel.battleSceneObservable
      .subscribe((state) => {
        this.visible = state.phaseState.phase === "reserveActions";
      })
      .addTo(subscription);

    battleSceneViewModel.battleSceneObservable
      .subscribe((state) => this.characterLayer.update(state.friendListState.one))
      .addTo(subscription);

    return subscription;
  }
}
