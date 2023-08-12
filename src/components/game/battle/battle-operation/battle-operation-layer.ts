import { Container } from "pixi.js";
import { CharacterLayer } from "./character-layer";
import { type Subscription } from "rxjs";
import { type BattleSceneViewModel } from "../../../../scene/battle-scene/battle-scene-view-model";

export class BattleOperationLayer extends Container {
  private readonly characterLayer = new CharacterLayer();

  constructor() {
    super();

    this.addChild(this.characterLayer);
  }

  subscribe(battleSceneViewModel: BattleSceneViewModel): Subscription {
    return battleSceneViewModel.friendListObservable.subscribe((state) => this.characterLayer.update(state.one));
  }
}
