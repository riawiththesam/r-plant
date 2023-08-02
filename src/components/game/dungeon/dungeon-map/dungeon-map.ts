import * as PIXI from "pixi.js";
import { DungeonMapChip } from "../dungeon-map-chip/dungeon-map-chip";

const chipSize = 10;

export class DungeonMap extends PIXI.Container {
  constructor() {
    super();

    this.x = 100;
    this.y = 100;

    const mapBase = new PIXI.Graphics();
    mapBase.beginFill(0xffff00);
    mapBase.drawRect(0, 0, chipSize * 20, chipSize * 20);
    this.addChild(mapBase);

    this.addChild(createMapChip(0, 0));
    this.addChild(createMapChip(2, 0));
  }
}

/**
 *
 * @param xIndex
 * @param yIndex
 * @returns
 */
function createMapChip(xIndex: number, yIndex: number) {
  const chipPosX = xIndex * chipSize + chipSize / 2;
  const chipPosY = yIndex * chipSize + chipSize / 2;
  return new DungeonMapChip({ x: chipPosX, y: chipPosY });
}
