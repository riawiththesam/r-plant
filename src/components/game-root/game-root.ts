import { MainScene } from "../../scene/main-scene/main-scene";
import { DungeonScene } from "../../scene/dungeon-scene/dungeon-scene";
import { TestScene } from "../../scene/test-scene/test-scene";
import { SceneSwitcher } from "../../util/pixi/scene-switcher/scene-switcher";
import { type Application, Container } from "pixi.js";
import { BattleScene } from "../../scene/battle-scene/battle-scene";
import { GameRootViewModel } from "./game-root-view-model";
import { Subscription } from "rxjs";

export type GameRootProps = {
  app: Application;
};

export class GameRoot extends Container {
  constructor(props: GameRootProps) {
    super();
    const { app } = props;

    const gameRootViewModel = new GameRootViewModel();

    app.ticker.add((delta) => {
      gameRootViewModel.tick(delta);
    });

    gameRootViewModel.setScene(MainScene.name);

    const sceneSwitcher = new SceneSwitcher({
      app,
      sceneList: [
        [MainScene.name, () => new MainScene(gameRootViewModel)],
        [DungeonScene.name, () => new DungeonScene(gameRootViewModel)],
        [BattleScene.name, () => new BattleScene(gameRootViewModel)],
        [TestScene.name, () => new TestScene()],
      ],
    });

    const subscription = new Subscription();
    gameRootViewModel.sceneObservable
      .subscribe((next) => {
        sceneSwitcher.startScene(next);
      })
      .addTo(subscription);
    this.addChild(sceneSwitcher);
  }
}
