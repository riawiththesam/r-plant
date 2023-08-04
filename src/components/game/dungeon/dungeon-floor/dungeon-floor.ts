import { Container, Color, Graphics } from "pixi.js";

export type DungeonFloorProps = {
  chipSize: number;
  visible: boolean;
};

export class DungeonFloor extends Container {
  constructor(props: DungeonFloorProps) {
    super();
    const { chipSize, visible } = props;
    this.visible = visible;

    const color = new Color({ r: 90, g: 100, b: 60 });
    const rect = new Graphics();
    rect.beginFill(color);
    rect.drawRect(-chipSize / 2, -chipSize / 2, chipSize, chipSize);
    this.addChild(rect);
  }
}
