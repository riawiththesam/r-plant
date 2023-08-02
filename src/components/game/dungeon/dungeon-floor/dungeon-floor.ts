import * as PIXI from "pixi.js";

const chipSize = 10;

export class DungeonFloor extends PIXI.Container {
  constructor() {
    super();

    const rect = new PIXI.Graphics();
    rect.beginFill(0x0000ff);
    rect.drawRect(-chipSize / 2, -chipSize / 2, chipSize, chipSize);
    this.addChild(rect);
  }
}
