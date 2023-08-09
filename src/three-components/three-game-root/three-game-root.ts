import { DungeonBackgroundThreeScene } from "../../three-scene/dungeon-background-scene/dungeon-background-three-scene";

export class ThreeGameRoot {
  private readonly threeScene: DungeonBackgroundThreeScene | undefined;

  constructor() {
    const threeCanvas = document.querySelector("#three") as HTMLCanvasElement;
    if (threeCanvas == null) return;

    this.threeScene = new DungeonBackgroundThreeScene(threeCanvas);
  }

  run(): void {
    const animation = (): void => {
      requestAnimationFrame(animation);
      this.threeScene?.animate();
    };
    animation();
  }

  resize(width: number, height: number): void {
    this.threeScene?.resize(width, height);
  }
}
