import * as PIXI from "pixi.js";
import { DungeonWall, DungeonWallDirection } from "../dungeon-wall/dungeon-wall";
import { DungeonFloor } from "../dungeon-floor/dungeon-floor";
import { MapChipType } from "../../../../types/map-state-types/map-state.types";

export type DungeonMapChipProps = {
  x: number;
  y: number;
  chipSize: number;
  lineWidth: number;
  chip: MapChipType;
  onWallPointerEnter: (direction: DungeonWallDirection) => void;
};

export class DungeonMapChip extends PIXI.Container {
  constructor(props: DungeonMapChipProps) {
    super();
    const { x, y, chipSize, lineWidth, chip, onWallPointerEnter } = props;

    this.x = x;
    this.y = y;

    const floor = new DungeonFloor({ chipSize: chipSize, visible: chip.floor != "none" });
    this.addChild(floor);

    const wallWest = new DungeonWall({
      direction: "west",
      chipSize: chipSize,
      lineWidth: lineWidth,
      type: chip.walls["west"],
      onPointerEnter: () => onWallPointerEnter("west"),
    });
    this.addChild(wallWest);

    const wallEast = new DungeonWall({
      direction: "east",
      chipSize: chipSize,
      lineWidth: lineWidth,
      type: chip.walls["east"],
      onPointerEnter: () => onWallPointerEnter("east"),
    });
    this.addChild(wallEast);

    const wallNorth = new DungeonWall({
      direction: "north",
      chipSize: chipSize,
      lineWidth: lineWidth,
      type: chip.walls["north"],
      onPointerEnter: () => onWallPointerEnter("north"),
    });
    this.addChild(wallNorth);

    const wallSouth = new DungeonWall({
      direction: "south",
      chipSize: chipSize,
      lineWidth: lineWidth,
      type: chip.walls["south"],
      onPointerEnter: () => onWallPointerEnter("south"),
    });
    this.addChild(wallSouth);
  }
}
