import { DungeonScene } from "../../scene/dungeon-scene/dungeon-scene";
import { TestScene } from "../../scene/test-scene/test-scene";
import { SceneSwitcher } from "../../util/pixi/scene-switcher/scene-switcher";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";
import { EditDungeonScene } from "../../scene/edit-dungeon-scene/edit-dungeon-scene";
import { ToolMainScene } from "../../scene/tool-main-scene/tool-main-scene";
import { Application, Container } from "pixi.js";

export type ToolRootProps = {
  app: Application;
};

export class ToolRoot extends Container {
  constructor(props: ToolRootProps) {
    super();
    const { app } = props;
    const { initializeGame, sceneObservable, setScene } = useGameUseCase();
    initializeGame();

    setScene(ToolMainScene.name);

    const sceneSwitcher = new SceneSwitcher({
      app,
      sceneList: [
        [ToolMainScene.name, () => new ToolMainScene()],
        [DungeonScene.name, () => new DungeonScene()],
        [EditDungeonScene.name, () => new EditDungeonScene()],
        [TestScene.name, () => new TestScene()],
      ],
    });

    sceneObservable.subscribe((next) => {
      sceneSwitcher.startScene(next);
    });
    this.addChild(sceneSwitcher);
  }
}
