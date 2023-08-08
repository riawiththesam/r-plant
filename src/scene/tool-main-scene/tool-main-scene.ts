import { Button } from "../../components/button/button";
import { EditDungeonScene } from "../edit-dungeon-scene/edit-dungeon-scene";
import { Scene } from "../../util/pixi/scene/scene";
import { GameRootViewModel } from "../../components/game-root/game-root-view-model";

export class ToolMainScene extends Scene {
  constructor() {
    super();

    const gameRootViewModel = new GameRootViewModel();

    this.addChild(
      new Button({
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        text: "ToolMain",
        onClick: () => {
          gameRootViewModel.setScene(EditDungeonScene.name);
        },
      }),
    );
  }
}
