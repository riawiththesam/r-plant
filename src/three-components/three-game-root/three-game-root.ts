import { DungeonBackgroundThreeScene } from "../../three-scene/dungeon-background-scene/dungeon-background-three-scene";

export class ThreeGameRoot {
  run() {
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
