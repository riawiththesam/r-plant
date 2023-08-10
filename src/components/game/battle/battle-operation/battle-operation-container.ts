import { Container } from "pixi.js";
import { BattleOperation } from "./battle-operation";

export class BattleOperationContainer extends Container {
  constructor() {
    super();

    this.addChild(new BattleOperation());
  }
}
