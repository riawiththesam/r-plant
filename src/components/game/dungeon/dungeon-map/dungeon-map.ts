import { DungeonMapChip } from "../dungeon-map-chip/dungeon-map-chip";
import { type MapChipType, type MapStateType } from "../../../../types/map-state-types/map-state.types";
import { type DungeonWallDirection } from "../dungeon-wall/dungeon-wall";
import { DungeonPlayerIcon } from "../../../../scene/dungeon-scene/dungeon-player-icon";
import { Container, Graphics } from "pixi.js";
import { type PlayerStateType } from "../../../../types/player-state-types/player-state-types";

const chipSize = 20;
const wallLineWidth = 4;

export type DungeonMapProps = {
  x: number;
  y: number;
  onWallPointerEnter?: (xIndex: number, yIndex: number, direction: DungeonWallDirection) => void;
};

export class DungeonMap extends Container {
  private readonly mapChipContainer: Container;
  private readonly playerIcon: DungeonPlayerIcon;

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

  setMap(state: MapStateType): void {
    this.mapChipContainer.removeChildren();

    state.mapChipList.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        this.mapChipContainer.addChild(createMapChip(col, colIndex, rowIndex, this.props.onWallPointerEnter));
      });
    });
  }

  setPlayerState(state: PlayerStateType): void {
    this.playerIcon.setState(state);
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
): DungeonMapChip {
  const chipPosX = xIndex * chipSize + chipSize / 2;
  const chipPosY = yIndex * chipSize + chipSize / 2;
  return new DungeonMapChip({
    x: chipPosX,
    y: chipPosY,
    chipSize,
    lineWidth: wallLineWidth,
    chip,
    onWallPointerEnter: (direction) => onWallPointerEnter?.(xIndex, yIndex, direction),
  });
}
