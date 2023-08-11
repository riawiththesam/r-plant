import { Container } from "pixi.js";
import { CharacterLayer } from "./character-layer";

export class BattleOperationLayer extends Container {
  private readonly characterLayer = new CharacterLayer();

  constructor() {
    super();

    this.addChild(this.characterLayer);
  }

  update(): void {
    this.characterLayer.update();
  }
}
