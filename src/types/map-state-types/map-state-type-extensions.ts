import { type PositionInDungeon } from "../position-in-dungeon-types/position-in-dungeon-types";
import { type MapStateType } from "./map-state.types";

export function canMoveForward(position: PositionInDungeon, map: MapStateType): boolean {
  const currentRow = map.mapChipList[position.y];
  if (currentRow == null) return false;
  const currentChip = currentRow[position.x];
  if (currentChip == null) return false;

  return currentChip.walls[position.direction] !== "wall";
}
