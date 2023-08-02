import * as PIXI from "pixi.js";

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DungeonWallDirection = "west" | "east" | "north" | "south";

export type DungeonWallProps = {
  direction: DungeonWallDirection;
  chipSize: number;
  lineWidth: number;
};

export class DungeonWall extends PIXI.Container {
  constructor(props: DungeonWallProps) {
    super();
    const { direction, chipSize, lineWidth } = props;

    const center = getCenterByDirection(direction, chipSize);
    const wallRect = getWallRectByDirection(direction, chipSize, lineWidth);

    const rect = new PIXI.Graphics();
    rect.beginFill(0x00ff00);
    rect.drawRect(center.x + wallRect.x, center.y + wallRect.y, wallRect.width, wallRect.height);

    this.addChild(rect);
  }
}

function getCenterByDirection(direction: DungeonWallDirection, chipSize: number) {
  switch (direction) {
    case "west": {
      return { x: -chipSize / 2, y: 0 };
    }
    case "east": {
      return { x: chipSize / 2, y: 0 };
    }
    case "north": {
      return { x: 0, y: -chipSize / 2 };
    }
    case "south": {
      return { x: 0, y: chipSize / 2 };
    }
  }
}

function getWallRectByDirection(direction: DungeonWallDirection, chipSize: number, lineWidth: number): Rect {
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

  switch (direction) {
    case "west":
      return portraitWall;
    case "east":
      return portraitWall;
    case "north":
      return landscapeWall;
    case "south":
      return landscapeWall;
  }
}
