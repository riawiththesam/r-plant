import { Container } from "pixi.js";
import { CharacterLayer } from "./character-layer";
import { type Subscription, type Observable } from "rxjs";
import { type FriendListState } from "../../../../scene/battle-scene/types/friend-list-state";

export class BattleOperationLayer extends Container {
  private readonly characterLayer = new CharacterLayer();

  constructor() {
    super();

    this.addChild(this.characterLayer);
  }

  subscribe(observable: Observable<FriendListState>): Subscription {
    return observable.subscribe((state) => this.characterLayer.update(state.one));
  }
}
