import { Container } from "pixi.js";
import { DungeonMap } from "../../components/game/dungeon/dungeon-map/dungeon-map";
import { useDungeonMapUseCase } from "../../use-case/dungeon-map-use-case/dungeon-map-use-case";

export class DungeonScene extends Container {
  constructor() {
    super();
    const { currentMapObservable, loadMap, playerPositionObservable } = useDungeonMapUseCase();

    const dungeonMap = new DungeonMap({
      x: 50,
      y: 50,
    });
    this.addChild(dungeonMap);
    currentMapObservable.subscribe((state) => {
      dungeonMap.setMap(state);
    });
    playerPositionObservable.subscribe((state) => {
      dungeonMap.setPlayerState(0, 0, "west");
    });

    loadMap();
  }
}
