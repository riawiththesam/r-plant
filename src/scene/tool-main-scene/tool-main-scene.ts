import * as PIXI from "pixi.js";
import { Button } from "../../components/button/button";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";
import { EditDungeonScene } from "../edit-dungeon-scene/edit-dungeon-scene";

export class ToolMainScene extends PIXI.Container {
  constructor() {
    super();

    const { setScene } = useGameUseCase();

    this.addChild(
      new Button({
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        text: "ToolMain",
        onClick: () => {
          setScene(EditDungeonScene.name);
        },
      }),
    );
  }
}
