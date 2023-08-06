import { Button } from "../../components/button/button";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";
import { DungeonScene } from "../dungeon-scene/dungeon-scene";
import { Scene } from "../../util/pixi/scene/scene";

export class MainScene extends Scene {
  constructor() {
    super();

    const { setScene } = useGameUseCase();

    this.addChild(
      new Button({
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        text: "text",
        onClick: () => {
          setScene(DungeonScene.name);
        },
      }),
    );
  }
}
