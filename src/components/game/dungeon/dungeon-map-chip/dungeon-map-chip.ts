import * as PIXI from "pixi.js";
import { DungeonWall } from "../dungeon-wall/dungeon-wall";
import { DungeonFloor } from "../dungeon-floor/dungeon-floor";

export type DungeonMapChipProps = {
  x: number;
  y: number;
  chipSize: number;
  lineWidth: number;
};

export class DungeonMapChip extends PIXI.Container {
  constructor(props: DungeonMapChipProps) {
    super();
    const { x, y, chipSize, lineWidth } = props;

    this.x = x;
    this.y = y;

    const wall1 = new DungeonWall({ direction: "west", chipSize: chipSize, lineWidth: lineWidth });
    this.addChild(wall1);

    const wallEast = new DungeonWall({ direction: "east", chipSize: chipSize, lineWidth: lineWidth });
    this.addChild(wallEast);

    const wallNorth = new DungeonWall({ direction: "north", chipSize: chipSize, lineWidth: lineWidth });
    this.addChild(wallNorth);

    const wallSouth = new DungeonWall({ direction: "south", chipSize: chipSize, lineWidth: lineWidth });
    this.addChild(wallSouth);

    const floor = new DungeonFloor({ chipSize: chipSize });
    this.addChild(floor);
  }
}
