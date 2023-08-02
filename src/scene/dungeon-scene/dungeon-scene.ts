import * as PIXI from "pixi.js";
import { Button } from "../../components/button/button";
import { DungeonBackgroundScene } from "../dungeon-background-scene/DungeonBackgroundScene";

export class DungeonScene extends PIXI.Container {
  constructor() {
    super();

    this.addChild(
      new Button({
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        text: "Dungeon",
        onClick: () => {
          console.log("onClick");
        },
      }),
    );

    this.addChild(new DungeonBackgroundScene());
  }
}
