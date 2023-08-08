import { DungeonMap } from "../../components/game/dungeon/dungeon-map/dungeon-map";
import { Scene } from "../../util/pixi/scene/scene";
import { DungeonSceneViewModel } from "./dungeon-scene-view-model";

export class DungeonScene extends Scene {
  constructor() {
    super();
    const viewModel = new DungeonSceneViewModel();

    const dungeonMap = new DungeonMap({
      x: 50,
      y: 50,
    });
    this.addChild(dungeonMap);
    viewModel.currentMapObservable.subscribe((state) => {
      dungeonMap.setMap(state);
    });
    viewModel.playerStateObservable.subscribe((state) => {
      dungeonMap.setPlayerState(state);
    });
    viewModel.eventOnEncountEnemyObservable.subscribe((_event) => {
      console.log("encount");
    });

    this.updateEvent.subscribe((event) => {
      viewModel.updatePlayer(event.delta);
    });

    viewModel.loadMap();
  }
}
