import * as PIXI from "pixi.js";
import { Button } from "../../components/button/button";

export class TestScene extends PIXI.Container {
  constructor() {
    super();

    this.addChild(
      new Button({
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        text: "TestScene",
        onClick: () => {
          console.log("onClick");
        },
      }),
    );
  }
}
