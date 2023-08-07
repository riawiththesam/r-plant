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
    const animated = getAnimatedRate(state);

    this.x = this.props.chipSize * state.position.x + this.props.chipSize * animated.x;
    this.y = this.props.chipSize * state.position.y + this.props.chipSize * animated.y;
    this.graphics.rotation = directionRadianMap[state.position.direction];
  }
}

type GetAnimatedRateResult = {
  x: number;
  y: number;
};
function getAnimatedRate(state: PlayerStateType): GetAnimatedRateResult {
  if (state.moveState.state != "moveForward") return { x: 0, y: 0 };

  const animationRate = (20 - state.moveState.delta) / 20;
  switch (state.position.direction) {
    case "east": {
      return {
        x: -animationRate,
        y: 0,
      };
    }
    case "south": {
      return {
        x: 0,
        y: -animationRate,
      };
    }
    case "west": {
      return {
        x: animationRate,
        y: 0,
      };
    }
    case "north": {
      return {
        x: 0,
        y: animationRate,
      };
    }
  }
}
