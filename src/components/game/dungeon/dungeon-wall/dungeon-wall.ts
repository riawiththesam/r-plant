import * as PIXI from "pixi.js";

const chipSize = 10;
const lineWidth = 2;

export type DungeonWallDirection = "west" | "east" | "north" | "south";
export type DungeonWallProps = {
  direction: DungeonWallDirection;
};

export class DungeonWall extends PIXI.Container {
  constructor(props: DungeonWallProps) {
    super();

    const wallRect = wallDirectionToRect(props.direction);

    const rect = new PIXI.Graphics();
    rect.beginFill(0x00ff00);
    rect.drawRect(wallRect.x, wallRect.y, wallRect.width, wallRect.height);

    this.addChild(rect);
  }
}

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const portraitWall: Rect = {
  x: -lineWidth / 2,
  y: -chipSize / 2,
  width: lineWidth,
  height: chipSize,
};

const landscapeWall: Rect = {
  x: -chipSize / 2,
  y: -lineWidth / 2,
  width: chipSize,
  height: lineWidth,
};

function wallDirectionToRect(direction: DungeonWallDirection): Rect {
  switch (direction) {
    case "west": {
      const center = { x: -chipSize / 2, y: 0 };
      return {
        x: center.x + portraitWall.x,
        y: center.y + portraitWall.y,
        width: portraitWall.width,
        height: portraitWall.height,
      };
    }
    case "east": {
      const center = { x: chipSize / 2, y: 0 };
      return {
        x: center.x + portraitWall.x,
        y: center.y + portraitWall.y,
        width: portraitWall.width,
        height: portraitWall.height,
      };
    }
    case "north": {
      const center = { x: 0, y: -chipSize / 2 };
      return {
        x: center.x + landscapeWall.x,
        y: center.y + landscapeWall.y,
        width: landscapeWall.width,
        height: landscapeWall.height,
      };
    }
    case "south": {
      const center = { x: 0, y: chipSize / 2 };
      return {
        x: center.x + landscapeWall.x,
        y: center.y + landscapeWall.y,
        width: landscapeWall.width,
        height: landscapeWall.height,
      };
    }
  }
}
