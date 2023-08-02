import * as PIXI from "pixi.js";
import { Button } from "../../components/button/button";

export class MainScene extends PIXI.Container {
  constructor() {
    super();
    this.addChild(
      new Button({
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        text: "text",
        onClick: () => {
          console.log("onClick");
        },
      }),
    );
  }
}
