import { Color, Container, Graphics } from "pixi.js";
import { type PlayerStateType } from "../../types/player-state-types/player-state-types";

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
  private readonly graphics: Graphics;

  constructor(private readonly props: DungeonPlayerIconProps) {
    super();
    const { chipSize } = props;
    this.graphics = new Graphics();
    this.graphics.x = this.props.chipSize / 2;
    this.graphics.y = this.props.chipSize / 2;
    this.graphics.beginFill(new Color({ r: 0, g: 255, b: 255 }));
    this.graphics.drawPolygon([0, -chipSize / 2, chipSize / 3, chipSize / 2, -chipSize / 3, chipSize / 2]);
    this.addChild(this.graphics);
  }

  setState(state: PlayerStateType): void {
    const animated = getAnimatedGraphicsState(state, this.props.chipSize);

    this.x = this.props.chipSize * state.position.x + animated.x;
    this.y = this.props.chipSize * state.position.y + animated.y;
    this.graphics.rotation = animated.rotation;
  }
}

type GetAnimatedGraphicsState = {
  x: number;
  y: number;
  rotation: number;
};
function getAnimatedGraphicsState(state: PlayerStateType, chipSize: number): GetAnimatedGraphicsState {
  // state.moveState.deltaの値から導かれたアニメーションの状態 1-0
  // アニメーションが始まった直後ほど値が大きくなる
  const animationRate = (20 - state.moveState.delta) / 20;
  switch (state.moveState.state) {
    case "stop": {
      return { x: 0, y: 0, rotation: directionRadianMap[state.position.direction] };
    }
    case "moveForward": {
      switch (state.position.direction) {
        case "east": {
          return {
            x: -animationRate * chipSize,
            y: 0,
            rotation: directionRadianMap[state.position.direction],
          };
        }
        case "south": {
          return {
            x: 0,
            y: -animationRate * chipSize,
            rotation: directionRadianMap[state.position.direction],
          };
        }
        case "west": {
          return {
            x: animationRate * chipSize,
            y: 0,
            rotation: directionRadianMap[state.position.direction],
          };
        }
        case "north": {
          return {
            x: 0,
            y: animationRate * chipSize,
            rotation: directionRadianMap[state.position.direction],
          };
        }
      }
      break;
    }
    case "turnLeft": {
      const targetRadian = directionRadianMap[state.position.direction];
      return {
        x: 0,
        y: 0,
        rotation: targetRadian + (animationRate * Math.PI) / 2,
      };
    }
    case "turnRight": {
      const targetRadian = directionRadianMap[state.position.direction];
      return {
        x: 0,
        y: 0,
        rotation: targetRadian - (animationRate * Math.PI) / 2,
      };
    }
  }
}
