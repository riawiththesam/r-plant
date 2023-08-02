import * as PIXI from "pixi.js";
import { useGameUseCase } from "./use-case/game-use-case/game-use-case";
import { MainScene } from "./scene/main-scene/main-scene";
import { SceneSwitcher } from "./util/pixi/scene-switcher/scene-switcher";
import { TestScene } from "./scene/test-scene/test-scene";
import { DungeonScene } from "./scene/dungeon-scene/dungeon-scene";

export function startGame() {
  const { gameConfig, sceneObservable } = useGameUseCase();

  const canvas = document.querySelector("#pixi") as HTMLCanvasElement;
  if (canvas == null) return;

  const options: Partial<PIXI.IApplicationOptions> = {
    width: gameConfig.width,
    height: gameConfig.height,
    view: canvas,
    backgroundAlpha: 0,
  };
  const app = new PIXI.Application(options);

  const sceneSwitcher = new SceneSwitcher({
    sceneList: [
      [MainScene.name, () => new MainScene()],
      [DungeonScene.name, () => new DungeonScene()],
      [TestScene.name, () => new TestScene()],
    ],
  });

  sceneObservable.subscribe((next) => {
    sceneSwitcher.startScene(next);
  });

  app.stage.addChild(sceneSwitcher);
}
