export type MapChipFloorType = "floor" | "none";
export type MapChipWallType = "wall" | "none";

export type MapChipType = {
  floor: MapChipFloorType;
  walls: {
    west: MapChipWallType;
    east: MapChipWallType;
    north: MapChipWallType;
    south: MapChipWallType;
  };
};

export type MapStateType = {
  mapChipList: ReadonlyArray<ReadonlyArray<MapChipType>>;
};
