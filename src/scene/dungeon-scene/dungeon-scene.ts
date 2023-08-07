import { DungeonMap } from "../../components/game/dungeon/dungeon-map/dungeon-map";
import { useDungeonMapUseCase } from "../../use-case/dungeon-map-use-case/dungeon-map-use-case";
import { Scene } from "../../util/pixi/scene/scene";

export class DungeonScene extends Scene {
  constructor() {
    super();
    const { currentMapObservable, loadMap, playerStateObservable, eventOnEncountEnemyObservable, updatePlayer } =
      useDungeonMapUseCase();

    const dungeonMap = new DungeonMap({
      x: 50,
      y: 50,
    });
    this.addChild(dungeonMap);
    currentMapObservable.subscribe((state) => {
      dungeonMap.setMap(state);
    });
    playerStateObservable.subscribe((state) => {
      dungeonMap.setPlayerState(state);
    });
    eventOnEncountEnemyObservable.subscribe((event) => {
      console.log("encount");
    });

    this.updateEvent.subscribe((event) => {
      updatePlayer(event.delta);
    });

    loadMap();
  }
}
