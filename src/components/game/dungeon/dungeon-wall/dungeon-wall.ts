import * as PIXI from "pixi.js";

export type DungeonWallDirection = "west" | "east" | "north" | "south";

export type DungeonWallProps = {
  direction: DungeonWallDirection;
  chipSize: number;
  lineWidth: number;
  visible: boolean;
};

export class DungeonWall extends PIXI.Container {
  constructor(props: DungeonWallProps) {
    super();
    const { direction, chipSize, lineWidth, visible } = props;
    this.visible = visible;

    const drawRect = getRectByDirection(direction, chipSize, lineWidth);

    const rect = new PIXI.Graphics();
    rect.beginFill(0x00ff00);
    rect.drawRect(drawRect.x, drawRect.y, drawRect.width, drawRect.height);

    this.addChild(rect);
  }
}

function getRectByDirection(direction: DungeonWallDirection, chipSize: number, lineWidth: number) {
  switch (direction) {
    case "west": {
      return { x: -chipSize / 2, y: -chipSize / 2, width: lineWidth / 2, height: chipSize };
    }
    case "east": {
      return { x: chipSize / 2 - lineWidth / 2, y: -chipSize / 2, width: lineWidth / 2, height: chipSize };
    }
    case "north": {
      return { x: -chipSize / 2, y: -chipSize / 2, width: chipSize, height: lineWidth / 2 };
    }
    case "south": {
      return { x: -chipSize / 2, y: chipSize / 2 - lineWidth / 2, width: chipSize, height: lineWidth / 2 };
    }
  }
}
