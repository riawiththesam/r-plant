import { Container, Text } from "pixi.js";
import { gameConfig } from "../../../../common/game-config";

export class BattleOperation extends Container {
  constructor() {
    super();

    const attackText = new Text("Attack");
    attackText.x = gameConfig.width - 100;
    attackText.y = (gameConfig.height * 3) / 4;
    attackText.pivot.x = attackText.width / 2;
    attackText.pivot.y = attackText.height / 2;
    this.addChild(attackText);
  }
}
