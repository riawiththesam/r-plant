import { MainScene } from "../../scene/main-scene/main-scene";
import { DungeonScene } from "../../scene/dungeon-scene/dungeon-scene";
import { TestScene } from "../../scene/test-scene/test-scene";
import { SceneSwitcher } from "../../util/pixi/scene-switcher/scene-switcher";
import { type Application, Container } from "pixi.js";
import { BattleScene } from "../../scene/battle-scene/battle-scene";
import { GameRootViewModel } from "./game-root-view-model";

export type GameRootProps = {
  app: Application;
};

export class GameRoot extends Container {
  constructor(props: GameRootProps) {
    super();
    const { app } = props;

    const gameRootViewModel = new GameRootViewModel();

    gameRootViewModel.setScene(MainScene.name);

    const sceneSwitcher = new SceneSwitcher({
      app,
      sceneList: [
        [MainScene.name, () => new MainScene(gameRootViewModel)],
        [DungeonScene.name, () => new DungeonScene(gameRootViewModel)],
        [BattleScene.name, () => new BattleScene()],
        [TestScene.name, () => new TestScene()],
      ],
    });

    gameRootViewModel.sceneObservable.subscribe((next) => {
      sceneSwitcher.startScene(next);
    });
    this.addChild(sceneSwitcher);
  }
}
