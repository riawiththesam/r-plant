import { MainScene } from "../../scene/main-scene/main-scene";
import { DungeonScene } from "../../scene/dungeon-scene/dungeon-scene";
import { TestScene } from "../../scene/test-scene/test-scene";
import { SceneSwitcher } from "../../util/pixi/scene-switcher/scene-switcher";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";
import { Container } from "pixi.js";

export class GameRoot extends Container {
  constructor() {
    super();
    const { sceneObservable, setMouseState, setScene } = useGameUseCase();

    setScene(MainScene.name);

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
    this.addChild(sceneSwitcher);

    document.addEventListener("pointerdown", () => {
      setMouseState(true);
    });
    document.addEventListener("pointerup", () => {
      setMouseState(false);
    });
  }
}
