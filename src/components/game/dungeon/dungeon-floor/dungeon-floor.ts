import * as PIXI from "pixi.js";

export type DungeonFloorProps = {
  chipSize: number;
};

export class DungeonFloor extends PIXI.Container {
  constructor(props: DungeonFloorProps) {
    super();
    const { chipSize } = props;

    const rect = new PIXI.Graphics();
    rect.beginFill(0x0000ff);
    rect.drawRect(-chipSize / 2, -chipSize / 2, chipSize, chipSize);
    this.addChild(rect);
  }
}
