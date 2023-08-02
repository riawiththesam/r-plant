import * as PIXI from "pixi.js";
import { DungeonWall } from "../dungeon-wall/dungeon-wall";
import { DungeonFloor } from "../dungeon-floor/dungeon-floor";

export type DungeonMapChipProps = {
  x: number;
  y: number;
};

export class DungeonMapChip extends PIXI.Container {
  constructor(props: DungeonMapChipProps) {
    super();

    this.x = props.x;
    this.y = props.y;

    const wall1 = new DungeonWall({ direction: "west", chipSize: 10, lineWidth: 2 });
    this.addChild(wall1);

    const wallEast = new DungeonWall({ direction: "east", chipSize: 10, lineWidth: 2 });
    this.addChild(wallEast);

    const wallNorth = new DungeonWall({ direction: "north", chipSize: 10, lineWidth: 2 });
    this.addChild(wallNorth);

    const wallSouth = new DungeonWall({ direction: "south", chipSize: 10, lineWidth: 2 });
    this.addChild(wallSouth);

    const floor = new DungeonFloor();
    this.addChild(floor);
  }
}
