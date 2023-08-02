import * as PIXI from "pixi.js";

export type DungeonFloorProps = {
  chipSize: number;
  visible: boolean;
};

export class DungeonFloor extends PIXI.Container {
  constructor(props: DungeonFloorProps) {
    super();
    const { chipSize, visible } = props;
    this.visible = visible;

    const rect = new PIXI.Graphics();
    rect.beginFill(0x0000ff);
    rect.drawRect(-chipSize / 2, -chipSize / 2, chipSize, chipSize);
    this.addChild(rect);
  }
}
