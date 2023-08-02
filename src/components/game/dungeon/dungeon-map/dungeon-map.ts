import * as PIXI from "pixi.js";
import { DungeonMapChip } from "../dungeon-map-chip/dungeon-map-chip";

export class DungeonMap extends PIXI.Container {
  constructor() {
    super();

    const container = new PIXI.Container();
    container.x = 100;
    container.y = 100;
    container.addChild(new DungeonMapChip());
    this.addChild(container);
  }
}
