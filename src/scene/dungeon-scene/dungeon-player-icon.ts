import { Color, Container, Graphics } from "pixi.js";

export type Direction = "west" | "east" | "north" | "south";

const directionRadianMap = {
  west: (Math.PI * 3) / 2,
  east: Math.PI / 2,
  north: 0,
  south: Math.PI,
};

export type DungeonPlayerIconProps = {
  chipSize: number;
};

export class DungeonPlayerIcon extends Container {
  private graphics: Graphics;

  constructor(private readonly props: DungeonPlayerIconProps) {
    super();
    const { chipSize } = props;
    this.graphics = new Graphics();
    this.graphics.beginFill(new Color({ r: 0, g: 255, b: 255 }));
    this.graphics.drawPolygon([0, -chipSize / 2, chipSize / 2, chipSize / 2, -chipSize / 2, chipSize / 2]);
    this.addChild(this.graphics);
  }

  setState(xIndex: number, yIndex: number, direction: Direction) {
    const xCenter = this.props.chipSize / 2;
    const yCenter = this.props.chipSize / 2;
    this.x = this.props.chipSize * xIndex + xCenter;
    this.y = this.props.chipSize * yIndex + yCenter;
    this.graphics.rotation = directionRadianMap[direction];
  }
}
