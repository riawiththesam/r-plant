import { DungeonBackgroundThreeScene } from "./dungeon-background-three-scene";
import * as PIXI from "pixi.js";

export class DungeonBackgroundScene extends PIXI.Container {
  constructor() {
    super();

    const threeCanvas = document.querySelector("#three") as HTMLCanvasElement;
    if (threeCanvas == null) return;

    const threeScene = new DungeonBackgroundThreeScene(threeCanvas);

    function animation() {
      requestAnimationFrame(animation);
      threeScene.animate();
    }
    animation();
  }
}
