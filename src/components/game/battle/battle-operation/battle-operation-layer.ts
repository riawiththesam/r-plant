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
      .subscribe((state) => {
        const phaseState = state.phaseState;
        if (phaseState.phase !== "reserveActions") return;
        const characterIndex = phaseState.characterIndex;
        this.characterLayer.update(
          state.friendListState.list[characterIndex]?.command,
          phaseState.selectedCommandIndex,
        );
      })
      .addTo(subscription);

    return subscription;
  }
}
