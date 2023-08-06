import { Button } from "../../components/button/button";
import { Scene } from "../../util/pixi/scene/scene";

export class TestScene extends Scene {
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
