import { Sprite } from "pixi.js";
import { Scene } from "../../util/pixi/scene/scene";
import bgGrass from "../../game-assets/background/bg-grass.png";
import { gameConfig } from "../../common/game-config";

export class BattleScene extends Scene {
  constructor() {
    super();

    const background = Sprite.from(bgGrass, {
      width: gameConfig.width,
      height: gameConfig.height,
    });
    this.addChild(background);
  }
}
