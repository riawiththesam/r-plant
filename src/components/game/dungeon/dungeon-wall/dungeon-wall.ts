import { Color, Container, Graphics } from "pixi.js";
import { type MapChipWallType } from "../../../../types/map-state-types/map-state.types";

export type DungeonWallDirection = "west" | "east" | "north" | "south";

export type DungeonWallProps = {
  direction: DungeonWallDirection;
  chipSize: number;
  lineWidth: number;
  type: MapChipWallType;
  onPointerEnter: () => void;
};

export class DungeonWall extends Container {
  constructor(props: DungeonWallProps) {
    super();
    const { direction, chipSize, lineWidth, type, onPointerEnter } = props;

    const drawRect = getRectByDirection(direction, chipSize, lineWidth);

    const rect = new Graphics();
    rect.beginFill(getColorByType(type));
    rect.alpha = type === "none" ? 0 : 1;
    rect.drawRect(drawRect.x, drawRect.y, drawRect.width, drawRect.height);
    this.addChild(rect);

    // タップ判定用エリア
    const pointerArea = getPointerAreaByDirection(direction, chipSize);
    const pointerRect = new Graphics();
    pointerRect.beginFill(0xff0000);
    // alphaを変更することでタップエリアを確認できる
    pointerRect.alpha = 0;
    pointerRect.drawRect(pointerArea.x, pointerArea.y, pointerArea.width, pointerArea.height);
    this.addChild(pointerRect);

    pointerRect.eventMode = "dynamic";
    pointerRect.on("pointerenter", onPointerEnter);
  }
}

function getColorByType(type: MapChipWallType): Color {
  switch (type) {
    case "wall":
      return new Color({ r: 0, g: 255, b: 0 });
    case "door":
      return new Color({ r: 60, g: 140, b: 180 });
    case "none":
      return new Color({ r: 255, g: 0, b: 0 });
  }
}

/**
 * 壁の描画エリア取得
 *
 * @param direction
 * @param chipSize
 * @param lineWidth
 * @returns
 */
function getRectByDirection(
  direction: DungeonWallDirection,
  chipSize: number,
  lineWidth: number,
): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
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

/**
 * 壁の編集時のクリックエリア取得
 *
 * @param direction
 * @param chipSize
 * @returns
 */
function getPointerAreaByDirection(
  direction: DungeonWallDirection,
  chipSize: number,
): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  switch (direction) {
    case "west": {
      const centerX = -chipSize / 2;
      const centerY = 0;
      return { x: centerX - chipSize / 4, y: centerY - chipSize / 4, width: chipSize / 2, height: chipSize / 2 };
    }
    case "east": {
      const centerX = chipSize / 2;
      const centerY = 0;
      return { x: centerX - chipSize / 4, y: centerY - chipSize / 4, width: chipSize / 2, height: chipSize / 2 };
    }
    case "north": {
      const centerX = 0;
      const centerY = -chipSize / 2;
      return { x: centerX - chipSize / 4, y: centerY - chipSize / 4, width: chipSize / 2, height: chipSize / 2 };
    }
    case "south": {
      const centerX = 0;
      const centerY = chipSize / 2;
      return { x: centerX - chipSize / 4, y: centerY - chipSize / 4, width: chipSize / 2, height: chipSize / 2 };
    }
  }
}
