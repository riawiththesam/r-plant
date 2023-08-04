import * as PIXI from "pixi.js";
import { DungeonMap } from "../../components/game/dungeon/dungeon-map/dungeon-map";
import { useDungeonMapUseCase } from "../../use-case/dungeon-map-use-case/dungeon-map-use-case";

export class DungeonScene extends PIXI.Container {
  constructor() {
    super();
    const { currentMapObservable, loadMap } = useDungeonMapUseCase();

    const dungeonMap = new DungeonMap({
      x: 50,
      y: 50,
    });

    currentMapObservable.subscribe((state) => {
      dungeonMap.setMap(state);
    });

    this.addChild(dungeonMap);

    loadMap();
  }
}
