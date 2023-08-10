import { Container } from "pixi.js";
import { BattleOperation } from "./battle-operation";
import { CharacterLayer } from "./character-layer";

export class BattleOperationLayer extends Container {
  private characterLayer = new CharacterLayer();

  constructor() {
    super();

    this.addChild(new BattleOperation());
    this.addChild(this.characterLayer);
  }

  update() {
    this.characterLayer.update();
  }
}
