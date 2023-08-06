import { DungeonMapChip } from "../dungeon-map-chip/dungeon-map-chip";
import { MapChipType, MapStateType } from "../../../../types/map-state-types/map-state.types";
import { DungeonWallDirection } from "../dungeon-wall/dungeon-wall";
import { DungeonPlayerIcon } from "../../../../scene/dungeon-scene/dungeon-player-icon";
import { Container, Graphics } from "pixi.js";

const chipSize = 20;
const wallLineWidth = 4;

export type DungeonMapProps = {
  x: number;
  y: number;
  onWallPointerEnter?: (xIndex: number, yIndex: number, direction: DungeonWallDirection) => void;
};

export class DungeonMap extends Container {
  private mapChipContainer: Container;
  private playerIcon: DungeonPlayerIcon;

  constructor(private readonly props: DungeonMapProps) {
    super();
    const { x, y } = props;

    this.x = x;
    this.y = y;

    const mapBase = new Graphics();
    mapBase.beginFill(0xffff00);
    mapBase.drawRect(0, 0, chipSize * 20, chipSize * 20);
    this.addChild(mapBase);

    this.mapChipContainer = new Container();
    this.addChild(this.mapChipContainer);

    this.playerIcon = new DungeonPlayerIcon({ chipSize });
    this.addChild(this.playerIcon);
  }

  setMap(state: MapStateType) {
    this.mapChipContainer.removeChildren();

    state.mapChipList.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        this.mapChipContainer.addChild(createMapChip(col, colIndex, rowIndex, this.props.onWallPointerEnter));
      });
    });
  }

  setPlayerState(xIndex: number, yIndex: number, direction: "west" | "east" | "north" | "south") {
    this.playerIcon.setState(xIndex, yIndex, direction);
  }
}

/**
 *
 * @param xIndex
 * @param yIndex
 * @returns
 */
function createMapChip(
  chip: MapChipType,
  xIndex: number,
  yIndex: number,
  onWallPointerEnter?: (xIndex: number, yIndex: number, direction: DungeonWallDirection) => void,
) {
  const chipPosX = xIndex * chipSize + chipSize / 2;
  const chipPosY = yIndex * chipSize + chipSize / 2;
  return new DungeonMapChip({
    x: chipPosX,
    y: chipPosY,
    chipSize: chipSize,
    lineWidth: wallLineWidth,
    chip: chip,
    onWallPointerEnter: (direction) => onWallPointerEnter && onWallPointerEnter(xIndex, yIndex, direction),
  });
}
