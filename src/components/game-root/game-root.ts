import { MainScene } from "../../scene/main-scene/main-scene";
import { DungeonScene } from "../../scene/dungeon-scene/dungeon-scene";
import { TestScene } from "../../scene/test-scene/test-scene";
import { SceneSwitcher } from "../../util/pixi/scene-switcher/scene-switcher";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";
import { Application, Container } from "pixi.js";
import { BattleScene } from "../../scene/battle-scene/battle-scene";

export type GameRootProps = {
  app: Application;
};

export class GameRoot extends Container {
  constructor(props: GameRootProps) {
    super();
    const { app } = props;
    const { sceneObservable, initializeGame, setScene } = useGameUseCase();
    initializeGame();

    setScene(MainScene.name);

    const sceneSwitcher = new SceneSwitcher({
      app,
      sceneList: [
        [MainScene.name, () => new MainScene()],
        [DungeonScene.name, () => new DungeonScene()],
        [BattleScene.name, () => new BattleScene()],
        [TestScene.name, () => new TestScene()],
      ],
    });

    sceneObservable.subscribe((next) => {
      sceneSwitcher.startScene(next);
    });
    this.addChild(sceneSwitcher);
  }
}
