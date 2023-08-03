import { DungeonBackgroundThreeScene } from "../../three-scene/dungeon-background-scene/dungeon-background-three-scene";

export class ThreeGameRoot {
  private threeScene: DungeonBackgroundThreeScene | undefined;

  constructor() {
    const threeCanvas = document.querySelector("#three") as HTMLCanvasElement;
    if (threeCanvas == null) return;

    this.threeScene = new DungeonBackgroundThreeScene(threeCanvas);
  }

  run() {
    const animation = () => {
      requestAnimationFrame(animation);
      this.threeScene?.animate();
    };
    animation();
  }

  resize(width: number, height: number) {
    this.threeScene?.resize(width, height);
  }
}
