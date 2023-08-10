import { Container, Sprite } from "pixi.js";
import bgGrass from "../../../../game-assets/background/bg-grass.png";
import { gameConfig } from "../../../../common/game-config";

export class BattleBackgroundLayer extends Container {
  constructor() {
    super();

    const background = Sprite.from(bgGrass, {
      width: gameConfig.width,
      height: gameConfig.height,
    });
    this.addChild(background);
  }
}
