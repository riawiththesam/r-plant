import * as PIXI from "pixi.js";
import { DungeonMapChip } from "../dungeon-map-chip/dungeon-map-chip";
import { MapChipType, MapStateType } from "../../../../types/map-state-types/map-state-types";

const chipSize = 20;
const wallLineWidth = 4;

export class DungeonMap extends PIXI.Container {
  private mapChipContainer: PIXI.Container;

  constructor() {
    super();

    this.x = 100;
    this.y = 100;

    const mapBase = new PIXI.Graphics();
    mapBase.beginFill(0xffff00);
    mapBase.drawRect(0, 0, chipSize * 20, chipSize * 20);
    this.addChild(mapBase);

    this.mapChipContainer = new PIXI.Container();
    this.addChild(this.mapChipContainer);
  }

  setMap(state: MapStateType) {
    this.mapChipContainer.removeChildren();

    state.mapChipList.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        this.mapChipContainer.addChild(createMapChip(col, colIndex, rowIndex));
      });
    });
  }
}

/**
 *
 * @param xIndex
 * @param yIndex
 * @returns
 */
function createMapChip(chip: MapChipType, xIndex: number, yIndex: number) {
  const chipPosX = xIndex * chipSize + chipSize / 2;
  const chipPosY = yIndex * chipSize + chipSize / 2;
  return new DungeonMapChip({ x: chipPosX, y: chipPosY, chipSize: chipSize, lineWidth: wallLineWidth, chip: chip });
}
