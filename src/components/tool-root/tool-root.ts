import { DungeonScene } from "../../scene/dungeon-scene/dungeon-scene";
import { TestScene } from "../../scene/test-scene/test-scene";
import { SceneSwitcher } from "../../util/pixi/scene-switcher/scene-switcher";
import { EditDungeonScene } from "../../scene/edit-dungeon-scene/edit-dungeon-scene";
import { ToolMainScene } from "../../scene/tool-main-scene/tool-main-scene";
import { Application, Container } from "pixi.js";
import { GameRootViewModel } from "../game-root/game-root-view-model";

export type ToolRootProps = {
  app: Application;
};

export class ToolRoot extends Container {
  constructor(props: ToolRootProps) {
    super();
    const { app } = props;
    const gameRootViewModel = new GameRootViewModel();

    gameRootViewModel.setScene(ToolMainScene.name);

    const sceneSwitcher = new SceneSwitcher({
      app,
      sceneList: [
        [ToolMainScene.name, () => new ToolMainScene()],
        [DungeonScene.name, () => new DungeonScene(gameRootViewModel)],
        [EditDungeonScene.name, () => new EditDungeonScene(gameRootViewModel)],
        [TestScene.name, () => new TestScene()],
      ],
    });

    gameRootViewModel.sceneObservable.subscribe((next) => {
      sceneSwitcher.startScene(next);
    });
    this.addChild(sceneSwitcher);
  }
}
