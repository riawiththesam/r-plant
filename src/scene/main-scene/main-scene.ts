import { Button } from "../../components/button/button";
import { DungeonScene } from "../dungeon-scene/dungeon-scene";
import { Scene } from "../../util/pixi/scene/scene";
import { GameRootViewModel } from "../../components/game-root/game-root-view-model";

export class MainScene extends Scene {
  constructor(gameRootViewModel: GameRootViewModel) {
    super();

    this.addChild(
      new Button({
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        text: "text",
        onClick: () => {
          gameRootViewModel.setScene(DungeonScene.name);
        },
      }),
    );
  }
}
