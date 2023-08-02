import * as PIXI from "pixi.js";
import { DungeonBackgroundScene } from "../dungeon-background-scene/dungeon-background-scene";
import { DungeonMap } from "../../components/game/dungeon/dungeon-map/dungeon-map";
import { useDungeonMapUseCase } from "../../use-case/dungeon-map-use-case/dungeon-map-use-case";

export class DungeonScene extends PIXI.Container {
  constructor() {
    super();
    const { currentMapObservable } = useDungeonMapUseCase();

    const dungeonMap = new DungeonMap();

    currentMapObservable.subscribe((state) => {
      dungeonMap.setMap(state);
    });

    this.addChild(new DungeonBackgroundScene());

    this.addChild(dungeonMap);
  }
}
