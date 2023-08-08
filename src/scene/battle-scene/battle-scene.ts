import { Container, Sprite } from "pixi.js";
import { Scene } from "../../util/pixi/scene/scene";
import { gameConfig } from "../../common/game-config";
import bgGrass from "../../game-assets/background/bg-grass.png";
import { BattleSceneViewModel } from "./battle-scene-view-model";

export class BattleScene extends Scene {
  override onCreate() {
    const viewModel = new BattleSceneViewModel();

    const background = Sprite.from(bgGrass, {
      width: gameConfig.width,
      height: gameConfig.height,
    });
    this.addChild(background);

    const enemyContainer = new Container();
    this.addChild(enemyContainer);
    viewModel.enemyListObservable.subscribe((state) => {
      enemyContainer.removeChildren();
      state.list.forEach((item) => {
        const enemySprite = Sprite.from(item.image);
        enemySprite.x = item.x;
        enemySprite.y = item.y;
        enemySprite.width = item.width;
        enemySprite.height = item.height;
        enemyContainer.addChild(enemySprite);
      });
    });

    viewModel.load();
  }
}
