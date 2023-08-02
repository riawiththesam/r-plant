import * as PIXI from "pixi.js";
import { DungeonWall } from "../dungeon-wall/dungeon-wall";
import { DungeonFloor } from "../dungeon-floor/dungeon-floor";
import { MapChipType } from "../../../../types/map-state-types/map-state-types";

export type DungeonMapChipProps = {
  x: number;
  y: number;
  chipSize: number;
  lineWidth: number;
  chip: MapChipType;
};

export class DungeonMapChip extends PIXI.Container {
  constructor(props: DungeonMapChipProps) {
    super();
    const { x, y, chipSize, lineWidth, chip } = props;

    this.x = x;
    this.y = y;

    const floor = new DungeonFloor({ chipSize: chipSize, visible: chip.floor != "none" });
    this.addChild(floor);

    const wallWest = new DungeonWall({
      direction: "west",
      chipSize: chipSize,
      lineWidth: lineWidth,
      visible: chip.walls.west != "none",
    });
    this.addChild(wallWest);

    const wallEast = new DungeonWall({
      direction: "east",
      chipSize: chipSize,
      lineWidth: lineWidth,
      visible: chip.walls.east != "none",
    });
    this.addChild(wallEast);

    const wallNorth = new DungeonWall({
      direction: "north",
      chipSize: chipSize,
      lineWidth: lineWidth,
      visible: chip.walls.north != "none",
    });
    this.addChild(wallNorth);

    const wallSouth = new DungeonWall({
      direction: "south",
      chipSize: chipSize,
      lineWidth: lineWidth,
      visible: chip.walls.south != "none",
    });
    this.addChild(wallSouth);
  }
}
