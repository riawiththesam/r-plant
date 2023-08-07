import { Color, Container, Graphics } from "pixi.js";
import { PlayerStateType } from "../../use-case/dungeon-map-use-case/player-state-types";

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
    this.graphics.x = this.props.chipSize / 2;
    this.graphics.y = this.props.chipSize / 2;
    this.graphics.beginFill(new Color({ r: 0, g: 255, b: 255 }));
    this.graphics.drawPolygon([0, -chipSize / 2, chipSize / 2, chipSize / 2, -chipSize / 2, chipSize / 2]);
    this.addChild(this.graphics);
  }

  setState(state: PlayerStateType) {
    this.x = this.props.chipSize * state.position.x;
    this.y = this.props.chipSize * state.position.y;
    this.graphics.rotation = directionRadianMap[state.position.direction];
  }
}
