import * as PIXI from "pixi.js";
import { DungeonWall } from "../dungeon-wall/dungeon-wall";
import { DungeonFloor } from "../dungeon-floor/dungeon-floor";

export class DungeonMapChip extends PIXI.Container {
  constructor() {
    super();

    const wall1 = new DungeonWall({ direction: "west" });
    this.addChild(wall1);

    const wallEast = new DungeonWall({ direction: "east" });
    this.addChild(wallEast);

    const wallNorth = new DungeonWall({ direction: "north" });
    this.addChild(wallNorth);

    const wallSouth = new DungeonWall({ direction: "south" });
    this.addChild(wallSouth);

    const floor = new DungeonFloor();
    this.addChild(floor);
  }
}
