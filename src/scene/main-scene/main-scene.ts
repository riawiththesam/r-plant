import * as PIXI from "pixi.js";
import { Button } from "../../components/button/button";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";
import { TestScene } from "../test-scene/test-scene";

export class MainScene extends PIXI.Container {
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
          setScene(TestScene.name);
        },
      }),
    );
  }
}
