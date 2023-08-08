import { Sprite } from "pixi.js";
import { Scene } from "../../util/pixi/scene/scene";
import bgGrass from "../../game-assets/background/bg-grass.png";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";

export class BattleScene extends Scene {
  constructor() {
    super();
    const gameUseCase = useGameUseCase();

    const background = Sprite.from(bgGrass, {
      width: gameUseCase.gameConfig.width,
      height: gameUseCase.gameConfig.height,
    });
    this.addChild(background);
  }
}
